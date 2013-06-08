chai = require 'chai'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'

assert = chai.assert
expect = chai.expect
should = chai.should()
chai.use sinonChai

suite 'Booking', ->
    test 'Application loads', ->
        assert App

