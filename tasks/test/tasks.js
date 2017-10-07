process.env.NODE_ENV='test'
process.env.PORT=8899
const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const assert = chai.assert
const server = require('../app')
chai.use(chaiHttp)

describe('Tasks', () => {
    var _id = null
    after( () => setTimeout( () => process.exit(), 1000))

    describe('/POST tasks', () => {  
        it('Would like not insert a new task', (done) => {
            chai.request(server).post('/tasks')
            .send({ title: 'teste'})
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('isValid')
                res.body.isValid.should.equal(false)
                done()
            } )
        })    
        it('Would like insert a new task', (done) => {
            chai.request(server).post('/tasks')
            .send({ title: 'teste', description:'teste'})
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('isValid')
                res.body.isValid.should.equal(true)
                res.body.should.have.property('data')
                res.body.data.should.have.property('_id')
                _id = res.body.data._id
                done()
            } )
        })  
    })

    describe('/GET tasks', () => {  
        it('Would like get task', (done) => {
            chai.request(server).get('/tasks/'+_id)
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('isValid')
                res.body.isValid.should.equal(true)
                res.body.should.have.property('data')
                res.body.data._id.should.equal(_id)
                done()
            } )
        })    
    })

    describe('/DELETE tasks', () => {  
        it('Would like delete a task', (done) => {
            chai.request(server).delete('/tasks/'+_id)
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('isValid')
                assert.isTrue(res.body.isValid)
                done()
            } )
        })   
        it('Would like not exist a task', (done) => {
            chai.request(server).get('/tasks/'+_id)
            .end( (err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('isValid')
                res.body.isValid.should.equal(true)
                res.body.should.have.property('data')
                assert.isNull(res.body.data)
                done()
            } )
        })     
    })

})