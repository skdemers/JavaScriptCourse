//1. Controller module - add event handler
//2. UI Module - Get input data from onlcick event
//3. Data module - Add new income or expense to internal data structure
//4. UI ModuleAdd above income to UI
//5. Data module - Calculate budget
//6. UI Module - Update budget UI


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

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;

        });
        
        data.totals[type] = sum;
    }
  
    var data = {
      allItems: {
        exp: [],
        inc: []
      },
      totals: {
        exp: 0,
        inc: 0
      },
      budget: 0,
      percentage: -1,
    };
  
    return {
        ////allows other modules to add items into our data structure
      addItem: function(type, des, val) {
        var newItem, ID;
  

        if (data.allItems[type].length > 0) {
            //Creat new ID
          ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
          ID = 0;
        }
  
        //create new item based on'imc' or 'exp' type
         if (type === "exp") {
          newItem = new Expense(ID, des, val);
        } else if (type === "inc") {
          newItem = new Income(ID, des, val);
        }
        data.allItems[type].push(newItem);
        return newItem;
      },
      calculateBudget: function() {

        //calculate total income and expenses
        calculateTotal('exp');
        calculateTotal('inc');
        //Calculate the budget: income - expenses
        data.budget = data.totals.inc - data.totals.exp;

        //calculate % of income that we spent
        if(data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.inc / data.totals.exp) * 100);
        }
        else {
            data.percentage = -1;
        }
      },

      getBudget: function() {
          return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage,
          };
      },
  
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
      budgetCtrl.calculateBudget();
      //2. Return the budget
      var budget = budgetCtrl.getBudget();
      //3. Display budget on UI
      console.log(budget);
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
  
      //5. Calculate and update budget
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
