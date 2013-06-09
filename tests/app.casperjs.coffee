casper = require('casper').create()
url = 'http://localhost:3000/'

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
    @click '#submit'
    @test.assertUrlMatch url, 'Form submit did not force a page refresh'
    @test.assertTextExists 'required', 'Validation messages should be shown'

# Light the fuse
casper.run ->
    @exit()
