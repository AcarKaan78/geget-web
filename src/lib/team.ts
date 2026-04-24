export type TeamRoleKey =
  | 'founder'
  | 'generalCoordinator'
  | 'administrativeCoordinator'
  | 'departmentCoordinator'
  | 'unitCoordinator'
  | 'member';

export interface TeamPerson {
  name: string;
  roleKey: TeamRoleKey;
  image?: string;
}

export interface TeamUnit {
  slug: string;
  nameKey: string;
  coordinator: TeamPerson;
  members: TeamPerson[];
}

export interface TeamDepartment {
  slug: string;
  nameKey: string;
  descriptionKey: string;
  coordinator?: TeamPerson;
  units?: TeamUnit[];
  members?: TeamPerson[];
}

export interface TeamStructure {
  founder: TeamPerson;
  generalCoordinators: TeamPerson[];
  administrativeCoordinators: TeamPerson[];
  departments: TeamDepartment[];
}

const IMG = (slug: string) => `/images/team/${slug}.webp`;

export const teamStructure: TeamStructure = {
  founder: { name: 'Halil Ecer', roleKey: 'founder', image: IMG('halil-ecer') },
  generalCoordinators: [
    { name: 'Rümeysa Çakır', roleKey: 'generalCoordinator', image: IMG('rumeysa-cakir') },
    { name: 'Burak Mert Cömert', roleKey: 'generalCoordinator', image: IMG('burak-mert-comert') },
  ],
  administrativeCoordinators: [
    { name: 'Eren Soylu', roleKey: 'administrativeCoordinator', image: IMG('eren-soylu') },
    { name: 'Ayşegül Dinçer', roleKey: 'administrativeCoordinator', image: IMG('aysegul-dincer') },
    { name: 'Emir Arslan', roleKey: 'administrativeCoordinator' },
  ],
  departments: [
    {
      slug: 'project',
      nameKey: 'departments.project.name',
      descriptionKey: 'departments.project.description',
      units: [
        {
          slug: 'euProject',
          nameKey: 'units.euProject',
          coordinator: {
            name: 'İrem Demirci',
            roleKey: 'unitCoordinator',
            image: IMG('irem-demirci'),
          },
          members: [
            { name: 'Fatma Nur Karagöz', roleKey: 'member', image: IMG('fatma-nur-karagoz') },
            { name: 'Şerife Nur Kuş', roleKey: 'member', image: IMG('serife-nur-kus') },
            { name: 'Yasemin Gürlek', roleKey: 'member', image: IMG('yasemin-gurlek') },
            { name: 'Melisa Kara', roleKey: 'member' },
          ],
        },
        {
          slug: 'academy',
          nameKey: 'units.academy',
          coordinator: {
            name: 'Evren Sarı',
            roleKey: 'unitCoordinator',
            image: IMG('evren-sari'),
          },
          members: [
            { name: 'Hatice Rana Aktaş', roleKey: 'member', image: IMG('hatice-rana-aktas') },
            {
              name: 'Ayşe Rana Selvitopu',
              roleKey: 'member',
              image: IMG('ayse-rana-selvitopu'),
            },
          ],
        },
        {
          slug: 'socialResponsibility',
          nameKey: 'units.socialResponsibility',
          coordinator: { name: 'Münevver Ertürk', roleKey: 'unitCoordinator' },
          members: [
            { name: 'Ahmet Hakan Koşar', roleKey: 'member', image: IMG('ahmet-hakan-kosar') },
            { name: 'Buse Karadavut', roleKey: 'member', image: IMG('buse-karadavut') },
          ],
        },
      ],
    },
    {
      slug: 'digitalMedia',
      nameKey: 'departments.digitalMedia.name',
      descriptionKey: 'departments.digitalMedia.description',
      units: [
        {
          slug: 'socialMedia',
          nameKey: 'units.socialMedia',
          coordinator: {
            name: 'Kübra Demir',
            roleKey: 'unitCoordinator',
            image: IMG('kubra-demir'),
          },
          members: [
            { name: 'Sevda Rezaei', roleKey: 'member', image: IMG('sevda-rezaei') },
          ],
        },
        {
          slug: 'design',
          nameKey: 'units.design',
          coordinator: {
            name: 'Şeydanur Kavak',
            roleKey: 'unitCoordinator',
            image: IMG('seydanur-kavak'),
          },
          members: [
            { name: 'Aleyna Akgül', roleKey: 'member', image: IMG('aleyna-akgul') },
          ],
        },
      ],
    },
    {
      slug: 'organization',
      nameKey: 'departments.organization.name',
      descriptionKey: 'departments.organization.description',
      coordinator: { name: 'Mehmet Ali Şahin', roleKey: 'departmentCoordinator' },
      members: [
        { name: 'Esma Sare Usta', roleKey: 'member', image: IMG('esma-sare-usta') },
        { name: 'Emirhan Aytemur', roleKey: 'member', image: IMG('emirhan-aytemur') },
      ],
    },
    {
      slug: 'press',
      nameKey: 'departments.press.name',
      descriptionKey: 'departments.press.description',
      units: [
        {
          slug: 'translation',
          nameKey: 'units.translation',
          coordinator: {
            name: 'Zeynepsu Gündoğan',
            roleKey: 'unitCoordinator',
            image: IMG('zeynepsu-gundogan'),
          },
          members: [{ name: 'Aybüke İdil Fidan', roleKey: 'member' }],
        },
        {
          slug: 'editorial',
          nameKey: 'units.editorial',
          coordinator: {
            name: 'Ayyüce Yılmaz',
            roleKey: 'unitCoordinator',
            image: IMG('ayyuce-yilmaz'),
          },
          members: [],
        },
      ],
    },
  ],
};
