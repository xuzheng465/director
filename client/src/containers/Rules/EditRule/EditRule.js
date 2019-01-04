import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";
import classes from "./EditRule.css";
import axios from "axios";

class EditRule extends Component {
  state = {
    formIsValid: true,
    conditionFormIsValid: true,
    id: null,
    ruleForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          label: "Name",
          placeholder: "Rule Name"
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
          placeholder: "Rule Tag"
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
          placeholder: "Rule Description"
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
    conditionForm: [],
    actionForm: []
  };

  componentDidMount() {
    const rid = this.props.match.params.id;
    axios.get(`/ruleDetails/${rid}`).then(res => {
      console.log(res.data);
      const response = res.data;

      let newRule = {
        name: {
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "Name",
            placeholder: "Rule Name"
          },
          value: "",
          validation: {
            required: true
          },
          valid: true,
          touched: true
        },
        tag: {
          elementType: "input",
          elementConfig: {
            type: "text",
            label: "Tag",
            placeholder: "Rule Tag"
          },
          value: "",
          validation: {
            required: true
          },
          valid: true,
          touched: true
        },
        description: {
          elementType: "input",
          elementConfig: {
            type: "textarea",
            label: "Description",
            placeholder: "Rule Description"
          },
          value: "",
          validation: {
            required: true
          },
          valid: true,
          touched: true
        }
      };

      newRule.name.value = response.rdb.rname;
      newRule.tag.value = response.rdb.rtag;
      newRule.description.value = response.rdb.rdescription;
      let newConditions = [];
      response.cdb.map(condition => {
        let newCondition = {
          id: {
            id: null,
            validation: { require: false },
            valid: true,
            touched: true
          },
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
            touched: true
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
            touched: true
          },
          value: {
            elementType: "input",
            elementConfig: {
              type: "text",
              label: "Value",
              placeholder: "Param Value"
            },
            value: "",
            validation: { required: true },
            valid: true,
            touched: true
          }
        };
        newCondition.id.id = condition.conditionid;
        newCondition.param.value = condition.parameter;
        newCondition.symbol.value = condition.symbol;
        newCondition.value.value = condition.value;
        newConditions.push(newCondition);
        return true;
      });

      let newActions = [];
      response.adb.map(action => {
        let newAction = {
          name: {
            elementType: "select",
            elementConfig: {
              label: "Action Name",
              options: [
                { value: 1, displayValue: "Text Message" },
                { value: 2, displayValue: "Email" },
                { value: 3, displayValue: "Phone Call" }
              ]
            },
            value: 1,
            validation: {},
            valid: true
          }
        };
        newAction.name.value = action.action_id;
        newActions.push(newAction);
        return true;
      });

      this.setState({
        id: rid,
        actionForm: newActions,
        ruleForm: newRule,
        conditionForm: newConditions
      });
    });
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
  editRuleHandler = event => {
    event.preventDefault();
    let editedRule = {
      ruledata: {
        rid: null,
        rname: null,
        rtag: null,
        rdescription: null
      },
      conditiondata: [],
      actiondata: []
    };
    const rule = this.state.ruleForm;
    const conditions = this.state.conditionForm;
    const actions = this.state.actionForm;

    editedRule.ruledata.rid = this.state.id;
    editedRule.ruledata.rname = rule.name.value;
    editedRule.ruledata.rtag = rule.tag.value;
    editedRule.ruledata.rdescription = rule.description.value;
    conditions.map(condition => {
      let newCon = {
        symbol: condition.symbol.value,
        value: condition.value.value,
        value_type: "int",
        parameter: condition.param.value,
        cid: condition.id.id
      };
      editedRule.conditiondata.push(newCon);
      return true;
    });

    actions.map(action => {
      let newAct = {
        aid: action.name.value
      };
      editedRule.actiondata.push(newAct);
      return true;
    });
    axios
      .post("/updateRule", editedRule)
      .then(res => {
        console.log(res);
        this.props.history.push("/rules");
      })
      .catch(err => {
        console.log(err);
      });
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
    console.log(updatedFormElement.valid);
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
      let conditionForm = formElementsArray.map(formElement => {
        if (formElement.id !== "id") {
          return (
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
          );
        } else return true;
      });
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
              <h4>Edit Rule</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 col-lg-9 col-xl-10 ml-auto">
            <div className="row pt-md-5display-5 ml-2 mr-2">
              <form onSubmit={this.editRuleHandler}>
                {ruleForm}
                <h5 className={"mb-2 mt-2"}>Conditions: </h5>

                {conditionsForm}
                <h5 className={"mb-2 mt-2"}>Actions: </h5>

                {actionsForm}
                <button
                  className={"btn-success mt-3 " + classes.Button}
                  disabled={
                    !(this.state.formIsValid && this.state.conditionFormIsValid)
                  }
                  onClick={this.editRuleHandler}
                >
                  Edit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditRule);
