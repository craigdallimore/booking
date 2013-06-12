casper = require('casper').create()
url = 'http://localhost:3000/'
dummy_booking = require './tests/dummy/booking.js'

casper.start url, ->

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
