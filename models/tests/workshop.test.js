const Workshop = require('../workshop.model');
const expect = require('chai').expect;

describe('Workshop', () => {
    it('should throw an error if no args', () => {
        const workshop = new Workshop({});

        workshop.validate(err => {
            expect(err.errors.name).to.exist;
            expect(err.errors.concertID).to.exist;
        });
    });

    it('should throw an error if args are not strings', () => {
        const cases = [{}, []];

        for (let name of cases) {
            const workshop = new Workshop({ name, name });

            workshop.validate(err => {
                expect(err.errors.name).to.exist;
                expect(err.errors.concertID).to.exist;
            });
        }
    });

    it('should return proper workshop if args are correct', () => {
        const workshop = new Workshop({ name: 'John Doe', concertID: 'Test Concert' });

        workshop.validate(err => {
            expect(err).to.not.exist;
        });
    });
}); 
