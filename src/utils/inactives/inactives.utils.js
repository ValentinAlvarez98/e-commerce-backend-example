export function findInactiveUsers(users) {

      const now = new Date();

      const inactives = users.filter(user => {

            const last_activity = user.last_activity;

            const mostRecentActivity = [last_activity].filter(activity => activity !== null).sort((a, b) => b - a)[0];

            return now - mostRecentActivity > 10000;

      }).map(inactive => {
            return {
                  _id: inactive._id,
                  email: inactive.email
            }
      });

      return {
            inactives,
            count: inactives.length
      }

}