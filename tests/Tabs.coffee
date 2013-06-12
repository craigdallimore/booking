casper = require('casper').create()
url = 'http://localhost:3000/'
dummy_booking = require './tests/dummy/booking.js'

casper.start url, ->

    @test.info 'Testing tabs'

    @test.assertNotVisible '#listings', 'Listings are initially hidden'
    @test.assertVisible '#booking', 'Booking form is initially visible'
    @test.assertExists '.current', 'A tab is set to current'

    @click '#tabs a[href="#listings"]'

    @test.assertVisible '#listings', 'Clicking the listings tab makes the listings visible'
    @test.assertNotVisible '#booking', 'Clicking the listings tab makes the booking form invisible'

    @click '#tabs a[href="#booking"]'

    @test.assertNotVisible '#listings', 'Clicking the booking tab makes the listings invisible'
    @test.assertVisible '#booking', 'Clicking the booking tab makes the booking form visible'

    @test.assertDoesntExist '.newItem', 'There should not be a new item indicator'

    @fill '#booking form',
        first_name:     dummy_booking.first_name
        last_name:      dummy_booking.last_name
        dining_date:    dummy_booking.dining_date
        num_covers:     dummy_booking.num_covers
        phone:          dummy_booking.phone
        email:          dummy_booking.email

    @click '#submit'

    @test.assertExists '.newItem', 'There should be a new item indicator after submitting a new item'

    @click '#tabs a[href="#listings"]'

    @test.assertDoesntExist '.newItem', 'The new item indicator should be cleared when the user switched to the listings view'

    ###
        - bbq
        - loading from the changed url will set the correct tab

        Later:
        - purty CSS!
        - cross browser testing inc ie8
            - forEach
            - JSON.stringify / parse?
    ###

# Light the fuse
casper.run ->
    @exit()
