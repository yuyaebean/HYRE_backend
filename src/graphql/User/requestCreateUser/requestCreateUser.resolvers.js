import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    requestCreateUser: async (_, args) => {
      const {
        name,
        birthday,
        email,
        cellPhone,
        company,
        companyCategory,
        team,
        position,
        workPhone,
        workAddress,
        majorName,
        generation
      } = args;

      const major = await prisma.major({ name: majorName });
      const gradYear = await prisma.gradYear({ generation });
      if (!major) {
        throw Error('Major not exist. Please check your major.');
      }
      if (!gradYear) {
        throw Error(
          'Graduated year not exist. Please check your graduated year.'
        );
      }

      return await prisma.createUser({
        name,
        birthday,
        email,
        cellPhone,
        company,
        companyCategory,
        team,
        position,
        workPhone,
        workAddress,
        isConfirmed: false,
        major: {
          connect: { name: majorName }
        },
        graduated_year: {
          connect: { generation }
        },
        photo: {
          connect: { id: 'ck611mszfgevm0901zo02ntsg' }
        }
      });
    }
  }
};