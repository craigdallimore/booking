chai = require 'chai'
sinon = require 'sinon'
sinonChai = require 'sinon-chai'

assert = chai.assert
expect = chai.expect
should = chai.should()
chai.use sinonChai

view = require '../static/js/View/View'

suite 'View', ->
    test 'Views are objects', ->
        view = new View()


