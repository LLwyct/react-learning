const ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'master',
        repo: 'https://github.com/liwenchi123000/liwenchi123000.github.io.git',
    },
    () => {
        console.log('Deploy Complete');
    }
)