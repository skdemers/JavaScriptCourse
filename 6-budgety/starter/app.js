//1. Controller module - add event handler
//2. UI Module - Get input data from onlcick event
//3. Data module - Add new income or expense to internal data structure
//4. UI ModuleAdd above income to UI
//5. Data module - Calculate budget
//6. UI Module - Update budget UI
<<<<<<< HEAD
//7. New Comment

//1. function declared and immediately called
var budgetController = (function() {
    var Expense = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
  
    var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
  
    var data = {
      allItems: {
        exp: [],
        inc: []
      },
      totals: {
        exp: 0,
        inc: 0
      }
    };
  
    return {
      addItem: function(type, des, val) {
        var newItem;
  
        if (data.allItems[type].length > 0) {
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
          ID = 0;
        }
  
        if (type === "exp") {
          newItem = new Expense(ID, des, val);
        } else if (type === "inc") {
          newItem = new Income(ID, des, val);
        }
  
        data.allItems[type].push(newItem);
        return newItem;
      },
      //this method is really Important. It is a publci method that exposes internal data
      testing: function() {
        console.log(data);
      }
    };
  })();
  
  var UIController = (function() {
    var DOMstrings = {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputValue: ".add__value",
      inputBtn: ".add__btn",
      incomeContainer: ".income__list",
      expensesContainer: ".expenses__list"
    };
    return {
      getInput: function() {
        //will be either inc or exp
        return {
          type: document.querySelector(DOMstrings.inputType).value,
          description: document.querySelector(DOMstrings.inputDescription).value,
          //parse float changes string to something with decimals
          value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
        };
      },
      addListItem: function(obj, type) {
        var html, newHtml, element;
        //Create HTML string with placeholder text
        if (type === "inc") {
          element = DOMstrings.incomeContainer;
  
          html =
            '<div class="item clearfix" id="income-%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        } else if (type === "exp") {
          element = DOMstrings.expensesContainer;
          html =
            '<div class="item clearfix" id="%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
  
        //Replace placeholder text with actual data
        newHtml = html.replace("%id%", obj.id);
        newHtml = newHtml.replace("%des%", obj.description);
        newHtml = newHtml.replace("%value%", obj.value);
        //insert into DOM
        document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
      },
  
      clearFields: function() {
        var fields, fieldArr;
        //this is a trick to turn what is delivered as a node list into an array
        fields = document.querySelectorAll(
          DOMstrings.inputDescription + ", " + DOMstrings.inputValue
        );
  
        fieldsArr = Array.prototype.slice.call(fields);
  
        fieldsArr.forEach(function(current, index, array) {
          current.value = "";
        });
  
        fieldsArr[0].focus();
      },
  
      getDOMstrings: function() {
        return DOMstrings;
      }
    };
  })();
  
  var controller = (function(budgetCtrl, UICtrl) {
    var DOM = UICtrl.getDOMstrings();
  
    var setUpEventListeners = function() {
      document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
  
      document.addEventListener("keypress", function(event) {
        if (event.keyCode === 13 || event.which === 13) {
          ctrlAddItem();
        }
      });
    };
  
    var updateBudget = function() {
      //1. Calculate the budget
      //2. add item to budget controler
      //3. Display budget on UI
    };
  
    var ctrlAddItem = function() {
      var input, newItem;
      //1. get field input data
      input = UICtrl.getInput();
  
      if (input.description !== "" && !isNaN(input.value) && input.value > 0)
      {
        //2. Add item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //3. Add item to UI
        UICtrl.addListItem(newItem, input.type);
        //4. Clear Fields
        UICtrl.clearFields();
      }
  
      //5. Calculate and update budget budget
      updateBudget();
  
      //6. Display budget
  
      console.log("it works");
    };
  
    return {
      init: function() {
        setUpEventListeners();
      }
    };
  })(budgetController, UIController);
  
  controller.init();
=======

//1. function declared and immediately called
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },
    //this method is really Important. It is a publci method that exposes internal data
    testing: function() {
      console.log(data);
    }
  };
})();

var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
  };
  return {
    getInput: function() {
      //will be either inc or exp
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        //parse float changes string to something with decimals
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    addListItem: function(obj, type) {
      var html, newHtml, element;
      //Create HTML string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      //Replace placeholder text with actual data
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%des%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);
      //insert into DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    clearFields: function() {
      var fields, fieldArr;
      //this is a trick to turn what is delivered as a node list into an array
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });

      fieldsArr[0].focus();
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

var controller = (function(budgetCtrl, UICtrl) {
  var DOM = UICtrl.getDOMstrings();

  var setUpEventListeners = function() {
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var updateBudget = function() {
    //1. Calculate the budget
    //2. add item to budget controler
    //3. Display budget on UI
  };

  var ctrlAddItem = function() {
    var input, newItem;
    //1. get field input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0)
    {
      //2. Add item to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      //3. Add item to UI
      UICtrl.addListItem(newItem, input.type);
      //4. Clear Fields
      UICtrl.clearFields();
    }

    //5. Calculate and update budget budget
    updateBudget();

    //6. Display budget

    console.log("it works");
  };

  return {
    init: function() {
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
>>>>>>> 551bf155ba3f7279b75910ac16c36c49f84b3a94
