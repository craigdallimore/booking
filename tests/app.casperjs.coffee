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

    @fill '#booking form'
        first_name:     dummy_booking.first_name
        last_name:      dummy_booking.last_name

    @click '#submit'
    @test.assertTextExists 'required', 'Validation messages are showing'

    @click '#reset'
    @test.assertTextDoesntExist 'required', 'Resetting form clears error messages'

    @fill '#booking form'
        dining_date: 'not_a_date'
        email: 'not_an_email'

    @click '#submit'

    @test.assertTextExists 'expects an email', 'The email field rejects emails without an \'@\' symbol'
    @test.assertTextExists 'expects a date', 'The date field rejects a date not formatted 12/12/1981'

    @fill '#booking form',
        dining_date:    dummy_booking.dining_date
        num_covers:     dummy_booking.num_covers
        email:          dummy_booking.email

    @click '#submit'

    @test.assertTextDoesntExist 'expects an email', 'The email field checks emails have an \'@\' symbol'
    @test.assertTextDoesntExist 'expects a date', 'The date field expects a date such as 12/12/1981'
    @test.assertTextDoesntExist 'expects a number', 'The number of covers field expects a number'

    @test.assertVisible '#forceSubmit', 'Force submit button is visible'
    @test.assertNotVisible '#submit', 'Submit button has been hidden'

    numListItems = @evaluate ->
        __utils__.findAll('#listings ul li').length

    @click '#forceSubmit'

    newNumListItems =  @evaluate ->
        __utils__.findAll('#listings tbody tr').length

    @test.assertNotEquals numListItems, newNumListItems, 'Number of items has increased'

    @test.assertNotVisible '#forceSubmit', 'Force submit button has been hidden'
    @test.assertVisible '#submit', 'Submit button is visible again'
    ###
        - permit forcing a booking with incomplete data
    ###


    @test.info 'Testing tabs'
    ###
        - bbq
        - tab controls should show which tab is active
        - table should initially be hidden
        - tabs permit swapping between table view and form view
        - when a new item is added, the table tab should glow
        - switching to the table tab will stop the glow
        - switching tabs will change the url
        - loading from the changed url will set the correct tab
    ###

    @test.info 'Testing table'
    ###
        Later:
        - purty CSS!
        - cross browser testing inc ie8
            - forEach
            - JSON.stringify / parse?
    ###

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

# Light the fuse
casper.run ->
    @exit()
