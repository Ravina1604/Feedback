
const {
    getJsonData,
    writeJsonData
} = require('../utils/fileInteraction');

const {
    noUserId,
    userNameAlreadyExist,
    userNameNotExist
} = require('../models/error');

//used to fetch all employees from Json file
async function getEmployee() {
    try {
        const data = await getJsonData('../localStore/store.json');
        return data.employees;
    }
    catch (e) {
        console.log(e);
    }
}

//To fetch all employees from Json and check whther particular userId exist or not.
async function verifyId(userId) {
    try {
        if(!userId) {
            return {error: noUserId.message};
        }
        const data = await getJsonData('../localStore/store.json');
        
        const index = data.employees.map(i => i.userId).indexOf(userId);

        if(index === -1) {
            return {error: userNameNotExist.message};
        }
        return {employee : data.employees[index]};
    }
    catch(e) {
        console.log(e);
    }
}

//Used to add new employee added by Admin
async function addEmployee(userId) {
  try {
      // read JSON file
      const data = await getJsonData('../localStore/store.json');
      console.log("add",data, userId);
      // find if this user exists
      if (data.employees.map(i => i.userId).includes(userId)) {
          return {error: userNameAlreadyExist.message};
      }
      else {
          // add new employee and write to Json file
          data.employees.push({
            userId,
            reviews: [],
            reviewer: []
        });
          writeJsonData('../localStore/store.json', data);
          return {success : true};
      }
  }
  catch (e) {
      console.log(e);
  }
}

//to remove employee from list and also remove him/her as a reviewer
async function removeEmployee(userId) {
  try {
      if (!userId) {
        return {error: noUserId.message};
      }
      //Fetch all employees
      const data = await getJsonData('../localStore/store.json');
      if (!data.employees.map(i => i.userId).includes(userId)) {
          return {error: userNameNotExist.message};
      }
      else {
          //get the employee's index
          const index = data.employees.map(item => item.userId).indexOf(userId);
          // remove the employee
          data.employees.splice(index, 1);
        //   remove him/her as a other employee's reviewer 
          data.employees.forEach((employee, index) => {
              const reviewerIndex = employee.reviewer.map(reviewer => reviewer.reviewerId).indexOf(userId);
              if (reviewerIndex !== -1) {
                  data.employees[index].reviewer.splice(reviewerIndex, 1);
              }
          })
          writeJsonData('../localStore/store.json', data);
          return {success : true};
      }
  }
  catch (e) {
      console.log(e);
  }
}

//to Assign employee as reviewer to other employees
async function assignEmployee(userId, reviewerId) {
    try {
        if (!userId || !reviewerId) {
            return {error: noUserId.message};
        }
        //Fetch employees from Json
        const data = await getJsonData('../localStore/store.json');
        //find Employee's index to whom we need to assign reviewer
        const index = data.employees.findIndex(item => {
            return item.userId === userId;
        });
        //check if Admin has already assigned same reviewer earlier
        const reviewerList = data.employees[index].reviewer.map(item => item.reviewerId);
        if (reviewerList.includes(reviewerId)) {
            return {error: userNameAlreadyExist.message};
        }
        //if not add reviewer to that particular employee to give review
        data.employees[index].reviewer.push({
            reviewerId,
            review: ''
        });
        writeJsonData('../localStore/store.json', data);
        return {success: true};
    }
    catch (e) {
        console.log(e);
    }
}

//to submit review by employees
async function submitReview(userId, reviewerId, review) {
    try {
        if (!userId || !reviewerId) {
            return {error: noUserId.message};
        }
        //fetch all employees
        const data = await getJsonData('../localStore/store.json');
         //find Employee's index to whom we need to give new review
        const index = data.employees.findIndex(item => {
            return item.userId === userId;
        });
        //find Reviwer's index for that particular employee
        const reviewerIndex = data.employees[index].reviewer.findIndex(item => {
            return item.reviewerId === reviewerId;
        });

        if(reviewerIndex == -1) {
            return {error: userNameNotExist.message};
        }
        //if exist update review with that reviewer.
        data.employees[index].reviewer[reviewerIndex].review = review;
        writeJsonData('../localStore/store.json', data);
        return {success: true};
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    getEmployee,
    addEmployee,
    removeEmployee,
    assignEmployee,
    submitReview,
    verifyId
}