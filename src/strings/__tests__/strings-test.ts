import Strings from '../index';

describe('Localization tests', () => {
  it('hello world', async () => {
    expect(Strings.t('helloWorld')).toBe('hello world!');
  });

  it('hello world format', async () => {
    expect(Strings.format('helloWorldFormat', 'one', 'two')).toBe(
      'hello world! one two'
    );
  });
});
