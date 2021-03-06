'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('KeyWords', [{
            name: 'Non renseigné',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Android',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Angular',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Basic',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'C',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'C#',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'C++',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Clojure',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Cloud',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Cobol',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'DBA',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Dart',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Delphi',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: '.NET',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'F#',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Flash',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Go',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Groovy',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'HTML5',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Haskell',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'J2EE',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Java',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Javascript',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Kotlin',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Lisp',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Lua',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Node.js',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'NoSQL',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'OCaml',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Objective-C',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'PHP',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Pascal',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Perl',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Python',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Ruby',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Rust',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'SEO',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Scala',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'SQL',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Swift',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Symfony',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Accueil',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Polyvalence',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Rédaction',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Créativité',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Commercial',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Administratif',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Sérieux',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Consciencieux',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Management',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Jovial',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Souriant',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Vendeur',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Dynamique',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Autonome',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Ambitieux',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Écologie',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Conseil',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Responsabilité',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        
    ]);
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('KeyWords', null, {});
    }
};