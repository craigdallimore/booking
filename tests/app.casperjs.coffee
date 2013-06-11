casper = require('casper').create()
url = 'http://localhost:3000/'
dummy_booking = require './tests/dummy/booking.js'

casper.start url, ->
    currentUrl = @getCurrentUrl()
    expectedUrl = url

    @test.assertUrlMatch url, 'URL is the one expected'
    @test.info 'Testing form'
    @test.assertExists '#booking form', 'Booking form exists'
    @test.assertExists '#first_name',   'Field: first_name exists'
    @test.assertExists '#last_name',    'Field: last_name exists'
    @test.assertExists '#dining_date',  'Field: dining_date exists'
    @test.assertExists '#num_covers',   'Field: num_covers exists'
    @test.assertExists '#phone',        'Field: phone exists'
    @test.assertExists '#email',        'Field: email exists'
    @test.assertExists '#submit',       'Submit button exists'

    numListItems = @evaluate ->
        __utils__.findAll('#listings ul li').length

    @click '#submit'
    @test.assertUrlMatch url, 'Form submit did not force a page refresh'
    @test.assertTextExists 'required', 'Validation messages should be shown'

    @fill '#booking form',
        first_name:     dummy_booking.first_name
        last_name:      dummy_booking.last_name
        dining_date:    dummy_booking.dining_date
        num_covers:     dummy_booking.num_covers
        phone:          dummy_booking.phone
        email:          dummy_booking.email

    @click '#submit'
    @test.assertTextDoesntExist 'required', 'Validation messages are removed on successful submission'

    #TODO: Reset form button should clear errors
    #TODO: Granular error messages (not a valid email, not a valid date)

    formValues = @evaluate ->
        __utils__.getFormValues '#booking form'

    @test.assertEquals formValues.first_name, '',   'Field: First name cleared'
    @test.assertEquals formValues.last_name, '',    'Field: Last name cleared'
    @test.assertEquals formValues.dining_date, '',  'Field: Dining Date cleared'
    @test.assertEquals formValues.num_covers, '',   'Field: Number of Covers cleared'
    @test.assertEquals formValues.phone, '',        'Field: Phone cleared'
    @test.assertEquals formValues.email, '',        'Field: Email cleared'

    newNumListItems =  @evaluate ->
        __utils__.findAll('#listings tbody tr').length

    @test.assertNotEquals newNumListItems, numListItems, 'Number of bookings has changed'

    @test.assertTextExists dummy_booking.first_name,    'First name is shown'
    @test.assertTextExists dummy_booking.last_name,     'Last name is shown'
    @test.assertTextExists dummy_booking.dining_date,   'Dining date is shown'
    @test.assertTextExists dummy_booking.num_covers,    'Number of covers is shown'
    @test.assertTextExists dummy_booking.phone,         'Phone number is shown'
    @test.assertTextExists dummy_booking.email,         'email is shown'

    @test.info 'Testing tabs'
    @test.info 'Testing table'

    @test.info 'Testing storage'
    @evaluate ->
        localStorage.clear()

    @reload ->
        @test.assertEvalEquals ->
            __utils__.findAll('#listings tbody tr').length
        , 0, 'Local storage is empty'

        @fill '#booking form',
            first_name:     dummy_booking.first_name
            last_name:      dummy_booking.last_name
            dining_date:    dummy_booking.dining_date
            num_covers:     dummy_booking.num_covers
            phone:          dummy_booking.phone
            email:          dummy_booking.email

        @click '#submit'
        @test.assertEvalEquals ->
            __utils__.findAll('#listings tbody tr').length
        , 1, 'List has one item in it'

        @reload ->
            @test.assertEvalEquals ->
                __utils__.findAll('#listings tbody tr').length
            , 1, 'List still has an item is it after a reload'

            @test.assertEvalEquals ->
                __utils__.findOne('#listings tbody tr:first-child select').value
            , 'Not Arrived', 'Status was set to \'Not arrived\''

            @evaluate ->
                $('#listings tbody tr:first-child select').val('Seated').change()

            @test.assertEvalEquals ->
                __utils__.findOne('#listings tbody tr:first-child select').value
            , 'Seated', 'Status is now set to \'Seated\''

            @reload ->
                @test.assertEvalEquals ->
                    __utils__.findOne('#listings tbody tr:first-child select').value
                , 'Seated', 'Status should still be \'Seated\' after a reload'

    ###
        TODO
        - ensure bookings stay in order
        - tab controls
        - bbq

        Later:
        - jQuery UI datepicker
        - purty CSS!
        - Validation strategy pattern
        - reset form: clears form, errors
        - permit forcing a booking with incomplete data
        - cross browser testing inc ie8
    ###
# Light the fuse
casper.run ->
    @exit()
