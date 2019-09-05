'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Companies', [{
      name: 'ASTON école Lille',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'admission-lille@aston-ecole.com',
      phone: '03 20 42 91 42',
      facebook: 'http://www.facebook.com/pages/ASTON-%C3%A9cole-dinformatique/234626209897365',
      twitter: 'http://twitter.com/#!/AstonEcole',
      linkedin: 'http://fr.linkedin.com/pub/aston-%C3%A9cole-d-informatique/37/b5b/a62',
      link: 'http://www.aston-ecole.com/',
      logo: './uploads/ASTON.png',
      about: 'Une vision … : celle d’une École ouverte et “connectée”, où chacun peut apprendre, communiquer, partager sans réserve et libérer son potentiel.',
      address: '169 Avenue de Bretagne, 59000 Lille',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'IBM Client Innovation Center',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'https://www-05.ibm.com/fr/contact_us/',
      phone: '08 10 83 54 26',
      facebook: 'https://fr-fr.facebook.com/IBM.France/',
      twitter: 'https://twitter.com/ibm_france/',
      linkedin: 'https://www.linkedin.com/company/ibm/',
      link: 'https://www.ibm.com/fr-fr',
      logo: './uploads/IBM.png',
      about: 'Le Centre a été créé pour offrir divers services techniques de haut niveau aux clients d’IBM. Il va permettre à IBM d’élargir ses capacités mondiales en offrant, localement, les compétences technologiques requises pour répondre aux impératifs des projets.',
      address: 'Euratechnologies 1, allée de la grande pelouse, 59000 Lille',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'AFPA Lomme Euratechnologies',
      password: '$2a$10$gP57sSHK8Srp4z6l1tUO/u/lpvF/yXkfqRtGIIPvsoQ0YxphRSERK',
      email: 'https://www.afpa.fr/',
      phone: '3936',
      facebook: 'https://fr-fr.facebook.com/afpa.hautsdefrance/',
      twitter: 'https://twitter.com/afpa_hdf',
      linkedin: 'https://www.linkedin.com/company/afpa/',
      link: 'https://www.afpa.fr/centre/centre-de-lille-lomme',
      logo: './uploads/AFPA.png',
      about: "Depuis plus de 65 ans, l'Afpa est le premier organisme de formation professionnelle qualifiante. Sa mission première n'a pas changé : vous former à l'emploi.",
      address: '4 avenue des Saules 59160 LILLE ',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};