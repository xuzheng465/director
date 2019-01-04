import React, { Component } from "react";
import axios from "axios";

import classes from "./AddRule.css";

import Input from "../../../components/UI/Input/Input";

class AddRule extends Component {
  state = {
    formIsValid: false,
    conditionFormIsValid: false,
    ruleForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Name",
          placeholder: "Rule Name",
          name: "ruleName"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      tag: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Tag",
          placeholder: "Rule Tag",
          name: "ruleTag"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      description: {
        elementType: "input",
        elementConfig: {
          type: "textarea",
          label: "Description",
          placeholder: "Rule Description",
          name: "ruleDsc"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    loading: false,
    conditionForm: [
      {
        param: {
          elementType: "select",
          elementConfig: {
            label: "Parameters",
            options: [
              { value: "param-a", displayValue: "Param A" },
              { value: "param-b", displayValue: "Param B" },
              { value: "param-c", displayValue: "Param C" }
            ]
          },
          value: "param-a",
          validation: {},
          valid: true,
          touched: false
        },
        symbol: {
          elementType: "select",
          elementConfig: {
            label: "Symbol",
            options: [
              { value: "larger", displayValue: "Larger" },
              { value: "smaller", displayValue: "Smaller" },
              { value: "equal", displayValue: "Equal" }
            ]
          },
          value: "larger",
          validation: {},
          valid: true,
          touched: false
        },
        value: {
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "Value",
            placeholder: "Param Value"
          },
          value: "",
          validation: {
            required: true
          },
          valid: false,
          touched: false
        }
      }
    ],
    actionForm: [
      {
        name: {
          elementType: "select",
          elementConfig: {
            label: "Action Name",
            options: [
              { value: 1, displayValue: "Text Message" },
              { value: 2, displayValue: "Email" },
              { value: 3, displayValue: "Alert" }
            ]
          },
          value: 1,
          validation: {},
          valid: true
        }
      }
    ]
  };

  componentDidMount() {
    // To Do: Get parameters and other selection options from the database.
    // The current version is hardcoding options in state.
  }

  checkValidation = (value, rules, type) => {
    let isValid = true;
    if (rules.required) {
      if (type === "Param Value") {
        isValid = value.trim() !== "" && !isNaN(value) && isValid;
      } else {
        isValid = value.trim() !== "" && isValid;
      }
    }

    return isValid;
  };

  addAction = () => {
    const actions = this.state.actionForm;
    const newAction = {
      name: {
        elementType: "select",
        elementConfig: {
          label: "Action Name",
          name: "actA",
          options: [
            { value: 1, displayValue: "Text Message" },
            { value: 2, displayValue: "Email" },
            { value: 3, displayValue: "Alert" }
          ]
        },
        value: 1,
        validation: {},
        valid: true
      }
    };
    if (this.state.actionForm.length < 3) {
      actions.push(newAction);
      this.setState({ actionForm: actions });
      console.log("Current actions length is", this.state.actionForm.length);
    }
  };

  removeAction = () => {
    const actions = this.state.actionForm;
    if (actions.length > 1) {
      actions.pop();
      this.setState({ actionForm: actions });
      console.log("Current action length is", this.state.actionForm.length);
    } else {
      console.log("You need at least one action.");
    }
  };

  addCondition = () => {
    const conditions = this.state.conditionForm;
    const newCondition = {
      param: {
        elementType: "select",
        elementConfig: {
          label: "Parameters",
          name: "paraA",
          options: [
            { value: "param-a", displayValue: "Param A" },
            { value: "param-b", displayValue: "Param B" },
            { value: "param-c", displayValue: "Param C" }
          ]
        },
        value: "param-a",
        validation: {},
        valid: true,
        touched: false
      },
      symbol: {
        elementType: "select",
        elementConfig: {
          label: "Symbol",
          name: "compair",
          options: [
            { value: "larger", displayValue: "Larger" },
            { value: "smaller", displayValue: "Smaller" },
            { value: "equal", displayValue: "Equal" }
          ]
        },
        value: "larger",
        validation: {},
        valid: true,
        touched: false
      },
      value: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Value",
          placeholder: "Param Value",
          name: "paraValue"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    };
    conditions.push(newCondition);
    this.setState({ conditionForm: conditions, conditionFormIsValid: false });
    console.log("Current condition length is", this.state.conditionForm.length);
  };

  removeCondition = () => {
    const conditions = this.state.conditionForm;
    if (conditions.length > 1) {
      conditions.pop();
      this.setState({ conditionForm: conditions });
      console.log(
        "Current condition length is",
        this.state.conditionForm.length
      );
    } else {
      console.log("You need at least one condition.");
    }
  };

  actionChangedHandler = (event, inputIdentifier, index) => {
    const actions = this.state.actionForm;
    const updatedActionForm = {
      ...this.state.actionForm[index]
    };
    const updatedFormElement = {
      ...updatedActionForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedActionForm[inputIdentifier] = updatedFormElement;
    actions[index] = updatedActionForm;
    this.setState({ actionForm: actions });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedRuleForm = {
      ...this.state.ruleForm
    };
    const updatedFormElement = {
      ...updatedRuleForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation,
      null
    );
    updatedFormElement.touched = true;
    updatedRuleForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedRuleForm) {
      formIsValid = updatedRuleForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ ruleForm: updatedRuleForm, formIsValid: formIsValid });
  };

  conditionChangedHandler = (event, inputIdentifier, index) => {
    const conditions = this.state.conditionForm;
    const updatedCondtionForm = {
      ...this.state.conditionForm[index]
    };
    const updatedFormElement = {
      ...updatedCondtionForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation,
      updatedFormElement.elementConfig.placeholder
    );
    updatedFormElement.touched = true;

    updatedCondtionForm[inputIdentifier] = updatedFormElement;
    conditions[index] = updatedCondtionForm;

    let conditionFormIsValid = true;
    for (let inputIdentifier in updatedCondtionForm) {
      conditionFormIsValid =
        updatedCondtionForm[inputIdentifier].valid && conditionFormIsValid;
    }

    this.setState({
      conditionForm: conditions,
      conditionFormIsValid: conditionFormIsValid
    });
  };

  checkCondition = () => {
    console.log(this.state.conditionForm);
  };

  checkAction = () => {
    console.log(this.state.actionForm);
  };

  checkRule = () => {
    console.log(this.state.ruleForm);
  };

  addRuleHandler = event => {
    event.preventDefault();
    let fullRule = {
      ruleName: null,
      ruleTag: null,
      ruleDes: null,
      conditionDB: [],
      actionDB: []
    };
    const rule = this.state.ruleForm;
    const conditions = this.state.conditionForm;
    const actions = this.state.actionForm;

    // Set rule form value
    fullRule["ruleName"] = rule.name.value;
    fullRule["ruleTag"] = rule.tag.value;
    fullRule["ruleDes"] = rule.description.value;

    // Set Condition form value
    conditions.map(condition => {
      let newCon = {
        symbol: condition.symbol.value,
        value: condition.value.value,
        value_type: "int",
        param: condition.param.value
      };
      fullRule.conditionDB.push(newCon);
      return true;
    });
    // Set Action form value
    actions.map(action => {
      let newAct = {
        action_id: action.name.value
      };
      fullRule.actionDB.push(newAct);
      return true;
    });

    console.log(fullRule);

    axios
      .post("/insertRule", fullRule)
      .then(res => {
        console.log(res);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.ruleForm) {
      formElementsArray.push({
        id: key,
        config: this.state.ruleForm[key]
      });
    }
    let ruleForm = formElementsArray.map(formElement => (
      <div key={formElement.id}>
        <Input
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => this.inputChangedHandler(event, formElement.id)}
        />
      </div>
    ));

    let conditionsForm = this.state.conditionForm.map((condition, index) => {
      const formElementsArray = [];
      for (let key in condition) {
        formElementsArray.push({
          id: key,
          config: condition[key]
        });
      }
      let conditionForm = formElementsArray.map(formElement => (
        <div key={formElement.id}>
          <Input
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event =>
              this.conditionChangedHandler(event, formElement.id, index)
            }
          />
        </div>
      ));
      return conditionForm;
    });

    let actionsForm = this.state.actionForm.map((action, index) => {
      const formElementsArray = [];
      for (let key in action) {
        formElementsArray.push({
          id: key,
          config: action[key]
        });
      }
      let actionForm = formElementsArray.map(formElement => (
        <div key={formElement.id}>
          <Input
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event =>
              this.actionChangedHandler(event, formElement.id, index)
            }
          />
        </div>
      ));
      return actionForm;
    });

    return (
      <div className={"container"}>
        <div className="row">
          <div className="col-md-8 col-lg-9 col-xl-10 ml-auto">
            <div className="row pt-md-5 mt-md-3 display-5 ml-2 mr-2">
              <h4>Add New Rule</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-lg-9 col-xl-10 ml-auto">
            <div className="row pt-md-5display-5 ml-2 mr-2">
              <form onSubmit={this.addRuleHandler}>
                {ruleForm}
                <h5 className={"mb-2 mt-2"}>Conditions: </h5>
                <div
                  className={"btn mr-2 " + classes.Button}
                  name="addCon"
                  onClick={this.addCondition}
                >
                  Add
                </div>
                <div
                  className={"btn mr-2 " + classes.RemoveButton}
                  name="rmvCon"
                  onClick={this.removeCondition}
                >
                  Remove
                </div>
                {conditionsForm}
                <h5 className={"mb-2 mt-2"}>Actions: </h5>
                <div
                  className={"btn mr-2 " + classes.Button}
                  name="addAct"
                  onClick={this.addAction}
                >
                  Add
                </div>
                <div
                  className={"btn mr-2 " + classes.RemoveButton}
                  name="rmvAct"
                  onClick={this.removeAction}
                >
                  Remove
                </div>
                {actionsForm}
                <button
                  className={"btn mt-5 " + classes.Button}
                  name="addRule"
                  style={{ width: "100px" }}
                  disabled={
                    !(this.state.formIsValid && this.state.conditionFormIsValid)
                  }
                >
                  ADD RULE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddRule;
