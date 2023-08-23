import { prisma } from '../lib/db';

async function main() {
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
      { name: 'Cocaine' },
      { name: 'DMT' },
      { name: 'Eating Disorders' },
      { name: 'Ecstasy' },
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
