import {app, HTTP_STATUSES} from "../../src";
import request from 'supertest'

describe('/skills', () => {
    beforeAll(async () => {
        await request(app).delete('/__TEST__/data')
    })

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/skills')
            .expect(HTTP_STATUSES.OK_200, []);
    })

    it('should not create new skill with incorrect input data', async () => {
        await request(app)
            .post('/skills')
            .send({title: ''})
            .expect(HTTP_STATUSES.BAD_REQUEST);

        await request(app)
            .get('/skills')
            .expect(HTTP_STATUSES.OK_200, []);
    })

    let createdSkill : any = null;
    let createdSkill2 : any = null
    it('should create new skill with correct input data', async () => {
        const createdResponse = await request(app)
            .post('/skills')
            .send({title: 'new skill'})
            .expect(HTTP_STATUSES.CREATED_201);
        createdSkill = createdResponse.body;
        expect(createdSkill).toEqual({
            id: expect.any(Number),
            title: "new skill"
        })
        await request(app)
            .get('/skills')
            .expect(HTTP_STATUSES.OK_200, [createdSkill]);
    })
    it('create none more skill', async () => {
        const createdResponse = await request(app)
            .post(`/skills`)
            .send({title: 'skill 2 title'})
            .expect(HTTP_STATUSES.CREATED_201);

        createdSkill2 = createdResponse.body
        await request(app)
            .get('/skills')
            .expect(HTTP_STATUSES.OK_200, [createdSkill, createdSkill2]);
    })
    it('should not update skill with incorrect data', async () => {
        await request(app)
            .put('/skills/' + createdSkill.id)
            .send({title: ''})
            .expect(HTTP_STATUSES.BAD_REQUEST)

        await request(app)
            .get('/skills/' + createdSkill.id)
            .expect(HTTP_STATUSES.OK_200, {
                ...createdSkill,
                title: 'new skill'
            });
    })
    it('should not update skill which does not exist', async () => {
        await request(app)
            .put(`/skills/` + 10)
            .send({title: 'normal title'})
            .expect(HTTP_STATUSES.NOT_FOUND_404)

    })
    it('should update skill with correct input data', async () => {
        await request(app)
            .put('/skills/' + createdSkill.id)
            .send({title: 'normal title'})
            .expect(HTTP_STATUSES.CREATED_201);

        await request(app)
            .get('/skills/' + createdSkill.id)
            .expect(HTTP_STATUSES.OK_200, {...createdSkill, title: 'normal title'});
    })
    it('should delete all skills', async () => {
        await request(app)
            .delete('/skills/' + createdSkill.id)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
            .get('/skills')
            .expect(HTTP_STATUSES.OK_200, [createdSkill2])

        await request(app)
            .delete('/skills/' + createdSkill2.id)
            .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
            .get('/skills')
            .expect(HTTP_STATUSES.OK_200, [])
    })

})