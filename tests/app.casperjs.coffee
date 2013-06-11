casper = require('casper').create()
url = 'http://localhost:3000/'
dummy_booking = require './tests/dummy/booking.js'

casper.start url, ->
    currentUrl = @getCurrentUrl()
    expectedUrl = url

    @test.assertUrlMatch url, 'URL is the one expected'
    @test.info 'Testing form'
    @test.assertExists '#booking form', 'Booking form exists'
    @test.assertExists '#first_name', 'Field: first_name exists'
    @test.assertExists '#last_name', 'Field: last_name exists'
    @test.assertExists '#dining_date', 'Field: dining_date exists'
    @test.assertExists '#num_covers', 'Field: num_covers exists'
    @test.assertExists '#phone', 'Field: phone exists'
    @test.assertExists '#email', 'Field: email exists'
    @test.assertExists '#submit', 'Submit button exists'

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

    #TODO: Clear / reset form button
    #TODO: Granular error messages
    #TODO: Reset form on successful submission

    newNumListItems =  @evaluate ->
        __utils__.findAll('#listings ul li').length

    @test.assertNotEquals newNumListItems, numListItems, 'Number of bookings has changed'
    ###
        TODO
        - 'save' model, push to bookingCollection
        - check for no dupes in bookingCollection?
        - create collection from localstorage
        - add to collection and save
        - clear form
        - create bookingItemView
        - template
        - update model when changing select box
        - reflect changes in bookingItemView
        - tab controls
        - bbqH

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
