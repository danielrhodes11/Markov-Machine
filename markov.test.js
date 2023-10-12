const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {
    const text = 'the cat in the hat';
    const markovMachine = new MarkovMachine(text);

    describe('Constructor', () => {
        it('should create a MarkovMachine with non-empty words array', () => {
            expect(markovMachine.words).toHaveLength(5);
        });

        it('should split the input text into words correctly', () => {
            expect(markovMachine.words).toEqual(['the', 'cat', 'in', 'the', 'hat']);
        });
    });

    describe('makeChains', () => {
        it('should create valid markov chains', () => {
            const expectedChains = new Map([
                ['the', ['cat', 'hat']],
                ['cat', ['in']],
                ['in', ['the']],
                ['hat', [null]],
            ]);
            expect(markovMachine.chains).toEqual(expectedChains);
        });
    });

    it('should generate text starting with a random key', () => {
        const text = markovMachine.makeText(5);
        const words = text.split(' ');
        expect(['the', 'cat', 'in', 'hat']).toContain(words[0]);
    });

    it('should generate text that follows the markov chains', () => {
        const text = markovMachine.makeText(10);
        const words = text.split(' ');

        // Check that 'in' is followed by a valid word in the generated text
        expect(words).toContain('in');
        const indexOfIn = words.indexOf('in');
        const wordFollowingIn = words[indexOfIn + 1];

        // Ensure that the word following 'in' is in your expected chain
        const expectedChainForIn = ['the'];
        expect(expectedChainForIn).toContain(wordFollowingIn);
    });

    it('should stop generating text when a termination word is reached', () => {
        const text = markovMachine.makeText(100);
        const words = text.split(' ');
        expect(words).toContain('hat');
        expect(words).not.toContain(null);
    });
});
