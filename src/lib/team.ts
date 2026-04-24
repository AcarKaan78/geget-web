export type TeamRoleKey =
  | 'founder'
  | 'generalCoordinator'
  | 'departmentCoordinator'
  | 'unitCoordinator'
  | 'member';

export interface TeamPerson {
  name: string;
  roleKey: TeamRoleKey;
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
  departments: TeamDepartment[];
}

export const teamStructure: TeamStructure = {
  founder: { name: 'Halil Ecer', roleKey: 'founder' },
  generalCoordinators: [
    { name: 'Rümeysa', roleKey: 'generalCoordinator' },
    { name: 'Burak', roleKey: 'generalCoordinator' },
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
          coordinator: { name: 'İrem Demirci', roleKey: 'unitCoordinator' },
          members: [
            { name: 'Fatma Nur Karagöz', roleKey: 'member' },
            { name: 'Şerife Nur Kuş', roleKey: 'member' },
            { name: 'Yasemin Gürlek', roleKey: 'member' },
            { name: 'Melisa Kara', roleKey: 'member' },
          ],
        },
        {
          slug: 'academy',
          nameKey: 'units.academy',
          coordinator: { name: 'Evren Sarı', roleKey: 'unitCoordinator' },
          members: [
            { name: 'Hatice Rana Aktaş', roleKey: 'member' },
            { name: 'Ayşe Rana Selvitopu', roleKey: 'member' },
          ],
        },
        {
          slug: 'socialResponsibility',
          nameKey: 'units.socialResponsibility',
          coordinator: { name: 'Münevver Ertürk', roleKey: 'unitCoordinator' },
          members: [
            { name: 'Ahmet Hakan Koşar', roleKey: 'member' },
            { name: 'Buse Karadavut', roleKey: 'member' },
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
          coordinator: { name: 'Kübra Demir', roleKey: 'unitCoordinator' },
          members: [{ name: 'Sevda Rezaei', roleKey: 'member' }],
        },
        {
          slug: 'design',
          nameKey: 'units.design',
          coordinator: { name: 'Şeydanur Kavak', roleKey: 'unitCoordinator' },
          members: [{ name: 'Aleyna Akgül', roleKey: 'member' }],
        },
      ],
    },
    {
      slug: 'organization',
      nameKey: 'departments.organization.name',
      descriptionKey: 'departments.organization.description',
      coordinator: { name: 'Mehmet Ali Şahin', roleKey: 'departmentCoordinator' },
      members: [
        { name: 'Esma Sare Usta', roleKey: 'member' },
        { name: 'Emirhan Aytemur', roleKey: 'member' },
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
          coordinator: { name: 'Zeynepsu Gündoğan', roleKey: 'unitCoordinator' },
          members: [{ name: 'Aybüke İdil Fidan', roleKey: 'member' }],
        },
        {
          slug: 'editorial',
          nameKey: 'units.editorial',
          coordinator: { name: 'Ayyüce Yılmaz', roleKey: 'unitCoordinator' },
          members: [],
        },
      ],
    },
  ],
};
