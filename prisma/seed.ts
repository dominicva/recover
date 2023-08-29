import { prisma } from '../lib/db';

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'me@dominicva.com',
    },
  });

  const questionnaires = await prisma.questionnaire.createMany({
    data: [
      {
        createdAt: new Date('2023-05-11'),
        mood: 5,
        energy: 3,
        motivation: 2,
        anxiety: 1,
        depression: 4,
        sleepQuality: 5,
        cravings: 3,
        userId: user.id,
      },
      {
        createdAt: new Date('2023-05-28'),
        mood: 2,
        energy: 3,
        motivation: 2,
        anxiety: 1,
        depression: 4,
        sleepQuality: 5,
        cravings: 3,
        userId: user.id,
      },
      {
        createdAt: new Date('2023-06-10'),
        mood: 3,
        energy: 3,
        motivation: 2,
        anxiety: 1,
        depression: 4,
        sleepQuality: 5,
        cravings: 3,
        userId: user.id,
      },
      {
        createdAt: new Date('2023-06-15'),
        mood: 4,
        energy: 3,
        motivation: 2,
        anxiety: 1,
        depression: 4,
        sleepQuality: 5,
        cravings: 3,
        userId: user.id,
      },
      {
        createdAt: new Date('2023-06-26'),
        mood: 5,
        energy: 3,
        motivation: 2,
        anxiety: 1,
        depression: 4,
        sleepQuality: 5,
        cravings: 3,
        userId: user.id,
      },
      {
        createdAt: new Date('2023-07-05'),
        mood: 3,
        energy: 3,
        motivation: 2,
        anxiety: 1,
        depression: 4,
        sleepQuality: 5,
        cravings: 3,
        userId: user.id,
      },
      {
        createdAt: new Date('2023-07-15'),
        mood: 2,
        energy: 3,
        motivation: 2,
        anxiety: 1,
        depression: 4,
        sleepQuality: 5,
        cravings: 3,
        userId: user.id,
      },
      {
        createdAt: new Date('2023-07-25'),
        mood: 1,
        energy: 3,
        motivation: 2,
        anxiety: 1,
        depression: 4,
        sleepQuality: 5,
        cravings: 3,
        userId: user.id,
      },
    ],
  });

  const substances = await prisma.substance.createMany({
    data: [
      { name: 'Adderall' },
      { name: 'Alcohol' },
      { name: 'Ambien' },
      { name: 'Amphetamines' },
      { name: 'Benzos' },
      { name: 'Binge Eating' },
      { name: 'Caffeine' },
      { name: 'Cannabis' },
      { name: 'Cigarettes' },
      { name: 'Cocaine' },
      { name: 'Codeine' },
      { name: 'DMT' },
      { name: 'Eating Disorders' },
      { name: 'Ecstasy' },
      { name: 'Elvanse' },
      { name: 'Exercise' },
      { name: 'Energy Drinks' },
      { name: 'Fast Food' },
      { name: 'Fentanyl' },
      { name: 'Gambling' },
      { name: 'Gaming' },
      { name: 'GHB' },
      { name: 'Hair Pulling' },
      { name: 'Heroin' },
      { name: 'Inhalants' },
      { name: 'Internet Addiction' },
      { name: 'Junk Food' },
      { name: 'Ketamine' },
      { name: 'LSD' },
      { name: 'MDMA' },
      { name: 'Meth' },
      { name: 'Mushrooms' },
      { name: 'Nail Biting' },
      { name: 'Nitrous' },
      { name: 'Opioids' },
      { name: 'Pornography' },
      { name: 'Purging' },
      { name: 'Ritalin' },
      { name: 'Salvia' },
      { name: 'Sex' },
      { name: 'Shopping' },
      { name: 'Sleeping Pills' },
      { name: 'Smoking' },
      { name: 'Soft Drinks' },
      { name: 'Steroids' },
      { name: 'Sugar' },
      { name: 'Tanning' },
      { name: 'Tobacco' },
      { name: 'Valium' },
      { name: 'Vaping' },
      { name: 'Vicodin' },
      { name: 'Xanax' },
    ],
    skipDuplicates: true,
  });

  console.log(substances);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
