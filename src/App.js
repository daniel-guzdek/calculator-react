import React, { Component } from 'react';
import { create, all } from 'mathjs';
import './css/style.css';
import { BsBackspace } from 'react-icons/bs';
import { RiDivideFill } from 'react-icons/ri';
import { FaSquareRootAlt } from 'react-icons/fa';

class App extends Component {

  state = {
    data: {
      operation: [],
      evalEquation: [],
      currentNumberOrSign: [],
      prevResult: [0],
      result: [0],
      error: []
    },
  }

  clearAllArays = () => {
    const { operation, evalEquation, currentNumberOrSign, prevResult, result, error } = this.state.data;
    this.setState({
      operation: operation.splice(0, operation.length),
      evalEquation: evalEquation.splice(0, evalEquation.length),
      prevResult: prevResult.splice(0, prevResult.length),
      currentNumberOrSign: currentNumberOrSign.splice(0, currentNumberOrSign.length),
      result: result.splice(0, result.length),
      error: error.splice(0, error.length),
    })
  }

  clearOperation = () => {
    const { operation } = this.state.data;
    this.setState({
      operation: operation.splice(0, operation.length),
    });
  }

  clearEvalEquation = () => {
    const { evalEquation } = this.state.data;
    this.setState({
      evalEquation: evalEquation.splice(0, evalEquation.length),
    });
  }

  clearPrevResult = () => {
    const { prevResult } = this.state.data;
    this.setState({
      prevResult: prevResult.splice(0, prevResult.length),
    });
  }

  clearResult = () => {
    const { result } = this.state.data;
    this.setState({
      result: result.splice(0, result.length),
    });
  }

  clearCurrentNumberOrSign = () => {
    const { currentNumberOrSign } = this.state.data;
    this.setState({
      currentNumberOrSign: currentNumberOrSign.splice(0, currentNumberOrSign.length)
    })
  }

  clearError = () => {
    const { error } = this.state.data;
    this.setState({
      error: error.splice(0, error.length),
    })
  }

  clearAndUpdateCurrentNumberOrSign = (e) => {
    const { currentNumberOrSign } = this.state.data;
    this.clearCurrentNumberOrSign();
    this.setState({
      currentNumberOrSign: currentNumberOrSign.push(e.target.innerText)
    })
  }

  changePlusMinusSignForPositiveNumber = () => {
    const { operation, evalEquation } = this.state.data;
    this.setState({
      operation: operation.unshift('-'),
      evalEquation: evalEquation.unshift('-'),
    })
  }

  changePlusMinusSignForNegativeNumber = () => {
    const { prevResult } = this.state.data;
    const config = { };
    const math = create(all, config);
    let currentResult = math.abs(prevResult);

    this.clearOperation();
    this.clearEvalEquation();
    this.clearPrevResult();
    this.pushOperationEvalEquationPrevResultByCurrentResult(currentResult);
  }

  findOperatorSignIndexInOperationArrayAndRemoveElementsToThisCharacter = (indexOfOperatorSign) => {
    const { operation } = this.state.data;
    this.setState({
      operation: operation.splice(0, indexOfOperatorSign + 1)
    }) 
  }

  findOperatorSignIndexInEvalEquationArrayAndRemoveElementsToThisCharacter = (indexOfOperatorSign) => {
    const { evalEquation } = this.state.data;
    this.setState({
      evalEquation: evalEquation.splice(0, indexOfOperatorSign + 1)
    }) 
  }

  pushOperation = (e) => {
    const { operation, prevResult } = this.state.data;
    if(e.target.innerText === '+/-') {
      if(operation.length === 0) {
        this.setState({
          operation: operation.push('-'),
        })
      }
    } else if(e.target.innerText === '1/x') {
      if(operation[0] === '1/') {
        this.setState({
          operation: operation.splice(0, 1)
        })
      } else {
        this.setState({
          operation: operation.unshift('1/')
        })
      }
    } else if(e.target.innerText === '%') {
      if(operation.includes('+') && operation[operation.length -1] !== ('+')) {
        const indexOfOperatorSign = operation.findIndex(el => el === '+');
        this.findOperatorSignIndexInOperationArrayAndRemoveElementsToThisCharacter(indexOfOperatorSign);
        const lastNumber = operation.join('').toString();
        this.clearOperation();
        this.setState({
          operation: operation.push(`(${prevResult} + ${prevResult * lastNumber/100})`)
        })
      } else if(operation.includes('-') && operation[operation.length -1] !== ('-')) {
        const indexOfOperatorSign = operation.findIndex(el => el === '-');
        this.findOperatorSignIndexInOperationArrayAndRemoveElementsToThisCharacter(indexOfOperatorSign);
        
        const lastNumber = operation.join('').toString();
        this.clearOperation();
        this.setState({
          operation: operation.push(`(${prevResult} - ${prevResult * lastNumber/100})`)
        })
      } else if(operation.includes('x') && operation[operation.length -1] !== ('x')) {
        const indexOfOperatorSign = operation.findIndex(el => el === 'x');
        this.findOperatorSignIndexInOperationArrayAndRemoveElementsToThisCharacter(indexOfOperatorSign);
        
        const lastNumber = operation.join('').toString();
        this.clearOperation();
        this.setState({
          operation: operation.push(`${prevResult * lastNumber/100}`)
        })
      } else if(operation.includes('/') && operation[operation.length -1] !== ('/')) {
        const indexOfOperatorSign = operation.findIndex(el => el === '/');
        this.findOperatorSignIndexInOperationArrayAndRemoveElementsToThisCharacter(indexOfOperatorSign); 
        
        const lastNumber = operation.join('').toString();
        this.clearOperation();
        this.setState({
          operation: operation.push(`${prevResult / (lastNumber/100)}`)
        })
      }
       else {
        this.clearOperation();
      }
    } else if(e.target.innerText === '0' && operation.length === 0) {
      return;
    } else {
      this.setState({
        operation: operation.push(e.target.innerText),
      })
    }
  }

  pushEvalEquation = (e) => {
    const { evalEquation, prevResult } = this.state.data;
    if(e.target.innerText === 'x') {
      this.setState({
        evalEquation: evalEquation.push('*')
      })
    } else if(e.target.innerText === '1/x') {
      this.setState({
        evalEquation: evalEquation.push(`${1/prevResult}`),
      })
    } else if(e.target.innerText === '%') {
      if(evalEquation.includes('+') && evalEquation[evalEquation.length -1] !== ('+')) {
        const indexOfOperatorSign = evalEquation.findIndex(el => el === '+');
        this.findOperatorSignIndexInEvalEquationArrayAndRemoveElementsToThisCharacter(indexOfOperatorSign);
        
        const lastNumber = evalEquation.join('').toString();
        this.clearEvalEquation();
        this.setState({
          evalEquation: evalEquation.push(`(${prevResult} + ${prevResult * lastNumber/100})`)
        })
      } else if(evalEquation.includes('-') && evalEquation[evalEquation.length -1] !== ('-')) {
        const indexOfOperatorSign = evalEquation.findIndex(el => el === '-');
        this.findOperatorSignIndexInEvalEquationArrayAndRemoveElementsToThisCharacter(indexOfOperatorSign);
        
        const lastNumber = evalEquation.join('').toString();
        this.clearEvalEquation();
        this.setState({
          evalEquation: evalEquation.push(`(${prevResult} - ${prevResult * lastNumber/100})`)
        })
      } else if(evalEquation.includes('*') && evalEquation[evalEquation.length -1] !== ('*')) {
        const indexOfOperatorSign = evalEquation.findIndex(el => el === '*');
        this.findOperatorSignIndexInEvalEquationArrayAndRemoveElementsToThisCharacter(indexOfOperatorSign);
        
        const lastNumber = evalEquation.join('').toString();
        this.clearEvalEquation();
        this.setState({
          evalEquation: evalEquation.push(`${prevResult * lastNumber/100}`)
        })
      } else if(evalEquation.includes('/') && evalEquation[evalEquation.length -1] !== ('/')) {
        const indexOfOperatorSign = evalEquation.findIndex(el => el === '/');
        this.findOperatorSignIndexInEvalEquationArrayAndRemoveElementsToThisCharacter(indexOfOperatorSign);
        
        const lastNumber = evalEquation.join('').toString();
        this.clearEvalEquation();
        this.setState({
          evalEquation: evalEquation.push(`${prevResult / (lastNumber/100)}`)
        })
      } else {
        this.clearEvalEquation();
        this.setState({
          evalEquation: evalEquation.push(`${prevResult/100}`),
        })
      }
    } else if(e.target.innerText === '0' && evalEquation.length === 0) {
      return;
    } else {
      this.setState({
        evalEquation: evalEquation.push(e.target.innerText),
      })
    }
  }

  pushOperationAndEvalEquationByZero = () => {
    const { operation, evalEquation } = this.state.data;
    this.setState({
      operation: operation.push(0),
      evalEquation: evalEquation.push(0),
    })
  }

  pushOperationEvalEquationPrevResultByCurrentResult = (currentResult) => {
    const { operation, evalEquation, prevResult } = this.state.data;
    this.setState({
      operation: operation.push(currentResult),
      evalEquation: evalEquation.push(currentResult),
      prevResult: prevResult.push(currentResult),
    })
  }

  pushEvalEquationPrevResultResultByCurrentResult = (currentResult) => {
    const { evalEquation, prevResult, result } = this.state.data;
    this.setState({
      evalEquation: evalEquation.push(currentResult),
      prevResult: prevResult.push(currentResult),
      result: result.push(currentResult),
    })
  }

  deleteLastIndexOperation = () => {
    const { operation } = this.state.data;
    this.setState({
      operation: operation.pop(),
    })
  }

  deleteLastIndexEvalEquation = () => {
    const { evalEquation } = this.state.data;
    this.setState({
      evalEquation: evalEquation.pop(),
    })
  }

  deleteLastIndexPrevResult = () => {
    const { prevResult } = this.state.data;
    this.setState({
      prevResult: prevResult.pop()
    })
  }

  deleteLastIndexResult = () => {
    const { result } = this.state.data;
    this.setState({
      result: result.pop()
    })
  }

  handleChangeSign = (e) => {
    this.deleteLastIndexOperation();
    this.deleteLastIndexEvalEquation();
    this.clearAndUpdateCurrentNumberOrSign(e);
    this.pushOperation(e);
    this.pushEvalEquation(e);
  }

  evaluateMathExpressionAndPushPrevResult = () => {
    const { evalEquation, prevResult } = this.state.data;
    const config = { };
    const math = create(all, config);
    let currentResult = math.format(math.evaluate(evalEquation.join('').toString()), {precision: 12});
    if(currentResult % 1 === 0) {
      currentResult = math.evaluate(evalEquation.join('').toString());
    }
    this.setState({
      prevResult: prevResult.push(currentResult)
    })
  }

  pushOperationAndEvalEquationEvaluateUpdatePrevResultAndResult = (e) => {
    const { prevResult, result } = this.state.data;
      this.pushOperation(e);
      this.pushEvalEquation(e);
      this.clearResult();
      this.clearPrevResult();
      this.evaluateMathExpressionAndPushPrevResult();
      this.setState({
        result: result.push(prevResult)
      })
  }

  handleCountCurrentEquationAfterClickSign = (e) => {
    const { operation, evalEquation, prevResult, result } = this.state.data;
    this.deleteLastIndexPrevResult();
    this.clearOperation();
    this.clearAndUpdateCurrentNumberOrSign(e);
    this.deleteLastIndexResult();
    this.evaluateMathExpressionAndPushPrevResult();
    this.clearEvalEquation();
    
    this.setState({
      result: result.push(prevResult.join('')),
      operation: operation.push(prevResult.join('')),
      evalEquation: evalEquation.push(prevResult.join(''))
    })
  }

  handleUpdateResultAndShowOperation = (e) => {
    const { prevResult, result } = this.state.data;
    this.pushOperation(e);
    this.deleteLastIndexPrevResult();
    this.clearAndUpdateCurrentNumberOrSign(e);
    this.deleteLastIndexResult();
    this.evaluateMathExpressionAndPushPrevResult();

    this.setState({
      result: result.push(prevResult.join(''))
    })
    this.pushEvalEquation(e);
  }

  evaluateMathPow2 = () => {
    const { operation, prevResult } = this.state.data;
    const config = { };
    const math = create(all, config);

    this.clearPrevResult();
    this.evaluateMathExpressionAndPushPrevResult();
    let currentResult = math.pow(prevResult.join(''), 2);

    this.clearOperation();
    this.setState({
      operation: operation.push(`(${prevResult} ^ 2)`)
    })
    this.clearPrevResult();
    this.clearResult();
    this.clearEvalEquation(); 
    this.pushEvalEquationPrevResultResultByCurrentResult(currentResult);
  }

  evaluateMathPow3 = () => {
    const { operation, prevResult } = this.state.data;
    const config = { };
    const math = create(all, config);

    this.clearPrevResult();
    this.evaluateMathExpressionAndPushPrevResult();
    let currentResult = math.pow(prevResult.join(''), 3);

    this.clearOperation();
    this.setState({
      operation: operation.push(`(${prevResult} ^ 3)`)
    })
    this.clearPrevResult();
    this.clearResult();
    this.clearEvalEquation();
    this.pushEvalEquationPrevResultResultByCurrentResult(currentResult);
  }

  evaluateMathSqrt = () => {
    const { operation, prevResult, error } = this.state.data;
    const config = { };
    const math = create(all, config);

    this.clearPrevResult();
    this.evaluateMathExpressionAndPushPrevResult();
    if(prevResult < 0) {
      if(prevResult < 0 && error[0] === "There is no square from negative number") {
        this.clearError();
        this.setState({
          error: error.push("There is no square from negative number")
        })
        return;
      } else {
        this.setState({
          error: error.push("There is no square from negative number")
        })
        return;
      }
    }
    
    let currentResult = math.sqrt(prevResult.join(''));

    this.clearOperation();
    this.setState({
      operation: operation.push(`sqrt(${prevResult})`)
    })
    this.clearPrevResult();
    this.clearResult();
    this.clearEvalEquation();
    this.pushEvalEquationPrevResultResultByCurrentResult(currentResult);
  }

  handleComaSignInLastIndex = (e) => {
    this.deleteLastIndexOperation();
    this.deleteLastIndexEvalEquation();
    this.handleCountCurrentEquationAfterClickSign(e);
    this.handleUpdateResultAndShowOperation(e);
  }

  equalizeOperationAndEvalEquationArrays = () => {
    const { operation, evalEquation } = this.state.data;
    this.clearOperation();
    this.setState({
      operation: operation.push([...evalEquation])
    })
  }

  // ALL CLEAR BUTTON
  handleAllClearButton = () => {
    const { result } = this.state.data;
    this.clearAllArays();
    this.setState({
      result: result.push(0)
    });
  }

  // BACKSPACE BUTTON
  handleBackspaceButton = () => {
    const { evalEquation, result, currentNumberOrSign } = this.state.data;
    this.setState({
      currentNumberOrSign: currentNumberOrSign.splice(0, currentNumberOrSign.length)
    })
    this.setState({
      currentNumberOrSign: currentNumberOrSign.push('Backspace')
    })
    this.clearError();
    this.deleteLastIndexEvalEquation();
    this.equalizeOperationAndEvalEquationArrays();
    if(evalEquation.length === 0) {
      this.clearResult();
      this.setState({
        result: result.push(0)
      })
    }
  }

  // PERSENTAGE BUTTON
  handlePersentageButton = (e) => {
    const { operation, evalEquation, result } = this.state.data;
    this.clearAndUpdateCurrentNumberOrSign(e);
    this.clearError();

    if(operation.length === 0 || evalEquation.length === 0) {
      return;
    } else if(evalEquation.includes('+') || evalEquation.includes('-') || evalEquation.includes('*') || evalEquation.includes('/')) {
      this.pushOperationAndEvalEquationEvaluateUpdatePrevResultAndResult(e);
    } else if(!evalEquation.includes('+') || !evalEquation.includes('-') || !evalEquation.includes('*') || !evalEquation.includes('/')) {
      this.clearResult();
      this.clearOperation();
      this.clearEvalEquation();
      this.setState({
        result: result.push(0)
      })
    } else {
      this.pushOperation(e);
      this.pushEvalEquation(e);
    } 
  }

  // RECIPROCAL BUTTON
  handleReciprocalButton = (e) => {
    const { operation, evalEquation, prevResult, error } = this.state.data;
    this.clearAndUpdateCurrentNumberOrSign(e);
    this.clearError();

    if(operation.length === 0 && evalEquation.length === 0) {
      this.setState({
        error: error.push("Cannot be divided by 0")
      })
      return;
    } else if(prevResult[0] === 0 || prevResult[0] === 'Infinity') {
      this.setState({
        error: error.push("Cannot be divided by 0")
      })
      return;
    } else if(evalEquation[evalEquation.length -1] === '+' || evalEquation[evalEquation.length -1] === '-' || evalEquation[evalEquation.length -1] === '*' || evalEquation[evalEquation.length -1] === '/' || evalEquation[evalEquation.length -1] === '=' || evalEquation[evalEquation.length -1] === '.'){
      this.deleteLastIndexOperation();
      this.deleteLastIndexEvalEquation();
    }
    this.clearPrevResult();
    this.evaluateMathExpressionAndPushPrevResult();
    this.clearEvalEquation();
    this.pushOperationAndEvalEquationEvaluateUpdatePrevResultAndResult(e);
  }

  // MATH POW(2) BUTTON
  handleMathPow2Button = () => {
    const { operation, evalEquation, result, currentNumberOrSign } = this.state.data;
    this.clearCurrentNumberOrSign();
    this.clearError();
    this.setState({
      currentNumberOrSign: currentNumberOrSign.push('x^2')
    })
    if(operation.length === 0 && evalEquation.length === 0) {
      this.setState({
        operation: operation.push(`${result}`),
        evalEquation: evalEquation.push(`${result}`)
      })
    } else if(evalEquation[evalEquation.length -1] === '=' || evalEquation[evalEquation.length -1] === '+' || evalEquation[evalEquation.length -1] === '-' || evalEquation[evalEquation.length -1] === '*' || evalEquation[evalEquation.length -1] === '/') {
      this.deleteLastIndexEvalEquation();
      this.evaluateMathPow2();
    } else {
      this.evaluateMathPow2();
    }
  }

  // MATH POW(3) BUTTON
  handleMathPow3Button = () => {
    const { operation, evalEquation, result, currentNumberOrSign } = this.state.data;
    this.clearCurrentNumberOrSign();
    this.clearError();
    this.setState({
      currentNumberOrSign: currentNumberOrSign.push('x^3')
    })

    if(operation.length === 0 && evalEquation.length === 0) {
      this.setState({
        operation: operation.push(`${result}`),
        evalEquation: evalEquation.push(`${result}`)
      })
    } else if(evalEquation[evalEquation.length -1] === '=' || evalEquation[evalEquation.length -1] === '+' || evalEquation[evalEquation.length -1] === '-' || evalEquation[evalEquation.length -1] === '*' || evalEquation[evalEquation.length -1] === '/') {
      this.deleteLastIndexEvalEquation();
      this.evaluateMathPow3();
    } else {
      this.evaluateMathPow3();
    }
  }

  // SQRT BUTTON
  handleSqrtButton = () => {
    const { operation, evalEquation, prevResult, result, currentNumberOrSign } = this.state.data;
    this.clearCurrentNumberOrSign();
    this.clearError();
    this.setState({
      currentNumberOrSign: currentNumberOrSign.push('sqrt(x)')
    })

    if(operation.length === 0 && evalEquation.length === 0) {
      this.setState({
        operation: operation.push(`sqrt(${result})`),
        evalEquation: evalEquation.push(result)
      })
    } else if(evalEquation.length === 0 || prevResult === 'undefined') {
      this.setState({
        operation: operation.push(`sqrt(${0})`),
        evalEquation: evalEquation.push(0)
      })
    } else if(evalEquation[evalEquation.length -1] === '=' || evalEquation[evalEquation.length -1] === '+' || evalEquation[evalEquation.length -1] === '-' || evalEquation[evalEquation.length -1] === '*' || evalEquation[evalEquation.length -1] === '/') {
      this.deleteLastIndexEvalEquation();
      this.evaluateMathSqrt();
    } else {
      this.evaluateMathSqrt();
    }
  }

  // NUMBER BUTTONS
  handleClickNumberButton = (e) => {
    const { operation, evalEquation, result, error } = this.state.data;
    this.clearAndUpdateCurrentNumberOrSign(e);
    this.clearError();

    if(evalEquation[0] === 0) {
      this.pushOperation(e);
      this.pushEvalEquation(e);
    } 
    else if(result[0] === 0 && result.length === 1) {
      this.pushOperation(e);
      this.pushEvalEquation(e);
      this.clearPrevResult();
    } else if(operation[operation.length -1] === '=' && evalEquation[evalEquation.length -1] === '=') {
      this.deleteLastIndexOperation();
      this.deleteLastIndexEvalEquation();
      this.pushOperation(e);
      this.pushEvalEquation(e);
    } else if((operation[operation.length -1]).includes(")")) {
      this.setState({
        error: error.push("Choose operator sign")
      })
      return;
    } else {
      this.pushOperation(e);
      this.pushEvalEquation(e);
    }
  }

  // COMA BUTTON
  handleComaButton = (e) => {
    const { operation, evalEquation, prevResult } = this.state.data;
    this.clearError();
    
    if(operation.length === 0 && evalEquation.length === 0) {
      this.pushOperationAndEvalEquationByZero();
      this.pushOperation(e);
      this.pushEvalEquation(e);
      this.clearAndUpdateCurrentNumberOrSign(e);
    } else if(operation[operation.length - 1] === '+' || operation[operation.length - 1] === '-' || operation[operation.length - 1] === 'x' || operation[operation.length - 1] === '/') {
      this.pushOperationAndEvalEquationByZero();
      this.pushOperation(e);
      this.pushEvalEquation(e);
      this.clearAndUpdateCurrentNumberOrSign(e);
    } else if((!evalEquation.includes('+') || !evalEquation.includes('-') || !evalEquation.includes('*') || !evalEquation.includes('/')) && evalEquation.includes('.')) {
      return;
    } else if(evalEquation.length === 1 && evalEquation % 1 !== 0) {
      return;
    } else if(prevResult % 1 !== 0 && operation[operation.length -1] === '=' && operation.length === 1) {
      return;
    } else if(operation[operation.length - 1] === '.' && evalEquation[evalEquation.length -1] === '.') {
      return;
    } else if(operation.includes('=') && evalEquation.includes('=')) {
      return;
    } else {
      this.clearAndUpdateCurrentNumberOrSign(e);
      this.clearOperation();
      this.setState({
        operation: operation.push([...evalEquation])
      })
      this.pushOperation(e);
      this.pushEvalEquation(e);
    }
  }

  // DIVIDE BUTTON
  handleClickDivideButton = (e) => {
    const { operation, evalEquation } = this.state.data;
    this.clearError();
    const divideBtnValue = '/';
    e.target.innerText = divideBtnValue;
    if(operation.length === 0) {
      return;
    } else if(operation[operation.length -1] === '/') {
      return;
    } else if(operation[operation.length -1] === '-' || operation[operation.length -1] === '+' || operation[operation.length -1] === 'x' || operation[operation.length -1] === '=') {
      this.handleChangeSign(e);
    } else if(operation[operation.length -1] === '.') {
      this.handleComaSignInLastIndex(e);
    } else if((operation[operation.length -1]).includes(")")) {
      this.handleCountCurrentEquationAfterClickSign(e);
      this.handleUpdateResultAndShowOperation(e);
    } else {
      if(evalEquation.includes('+') || evalEquation.includes('-') || evalEquation.includes('.') || evalEquation.includes('x') || evalEquation.includes('/')) {
        this.handleCountCurrentEquationAfterClickSign(e);
      }
      this.handleUpdateResultAndShowOperation(e); 
    }  
  }

  // MULTIPLY BUTTON
  handleClickMultiplyButton = (e) => {
    const { operation, evalEquation } = this.state.data;
    this.clearError();
    if(operation.length === 0) {
      return;
    } else if(operation[operation.length -1] === 'x') {
      return;
    } else if(operation[operation.length -1] === '-' || operation[operation.length -1] === '+' || operation[operation.length -1] === '/' || operation[operation.length -1] === '=') {
      this.handleChangeSign(e);
    } else if(operation[operation.length -1] === '.') {
      this.handleComaSignInLastIndex(e);
    } else if((operation[operation.length -1]).includes(")")) {
      this.handleCountCurrentEquationAfterClickSign(e);
      this.handleUpdateResultAndShowOperation(e);
    } else {
      if(evalEquation.includes('+') || evalEquation.includes('-') || evalEquation.includes('.') || evalEquation.includes('x') || evalEquation.includes('/')) {
        this.handleCountCurrentEquationAfterClickSign(e);
      }
      this.handleUpdateResultAndShowOperation(e); 
    }  
  }

  // MINUS BUTTON
  handleClickMinusButton = (e) => {
    const { operation, evalEquation } = this.state.data;
    this.clearError();
    if(operation.length === 0) {
      this.clearAndUpdateCurrentNumberOrSign(e);
      this.pushOperation(e);
      this.pushEvalEquation(e);
      return;
    } else if(operation[operation.length -1] === '-') {
      return;
    } else if(operation[operation.length -1] === '+' || operation[operation.length -1] === 'x' || operation[operation.length -1] === '/' || operation[operation.length -1] === '=') {
      this.handleChangeSign(e);
    } else if(operation[operation.length -1] === '.') {
      this.handleComaSignInLastIndex(e);
    } else if((operation[operation.length -1]).includes(")")) {
      this.handleCountCurrentEquationAfterClickSign(e);
      this.handleUpdateResultAndShowOperation(e);
    } else {
      if(evalEquation.includes('-') || evalEquation.includes('+') || evalEquation.includes('.') || evalEquation[evalEquation.length -1] === 'x' || evalEquation[evalEquation.length -1] === '/') {
        this.handleCountCurrentEquationAfterClickSign(e);
      }
      this.handleUpdateResultAndShowOperation(e);
    }  
  }

  // PLUS BUTTON
  handleClickPlusButton = (e) => {
    const { operation, evalEquation } = this.state.data;
    this.clearError();

    if(operation.length === 0) {
      return;
    } else if(operation[operation.length -1] === '+') {
      return;
    } else if(operation[operation.length -1] === '-' || operation[operation.length -1] === 'x' || operation[operation.length -1] === '/' || operation[operation.length -1] === '=') {
      this.handleChangeSign(e);
    } else if(operation[operation.length -1] === '.') {
      this.handleComaSignInLastIndex(e);
    } else if((operation[operation.length -1]).includes(")")) {
      this.handleCountCurrentEquationAfterClickSign(e);
      this.handleUpdateResultAndShowOperation(e);
    } else {
      if(evalEquation.includes('+') || evalEquation.includes('-') || evalEquation.includes('.') || evalEquation[evalEquation.length -1] === 'x' || evalEquation[evalEquation.length -1] === '/') {
        this.handleCountCurrentEquationAfterClickSign(e);
      }
      this.handleUpdateResultAndShowOperation(e); 
    }
  }

  // PLUS/MINUS (+/-) BUTTON
  handlePlusMinusButton = (e) => {
    const { operation, evalEquation, prevResult } = this.state.data;
    this.clearAndUpdateCurrentNumberOrSign(e);
    this.clearError();

    if(evalEquation.length === 0 && operation.length === 0) {
      this.setState({
        evalEquation: evalEquation.push('-'),
        operation: operation.push('-')
      })
    } else if(evalEquation[0] === 0 && operation[0] === 0) {
      return;
    } else if(evalEquation[0] > 0 && operation[0] > 0) {
      this.setState({
        operation: operation.unshift('-'),
        evalEquation: evalEquation.unshift('-'),
      })
    } else if(evalEquation[0] === '-' && operation[0] === '-') {
      this.setState({
        operation: operation.splice(0, 1),
        evalEquation: evalEquation.splice(0, 1)
      })
    } else if (operation[operation.length - 1] === '=' && evalEquation[evalEquation.length - 1] === '=') {
      this.deleteLastIndexOperation();
      this.deleteLastIndexEvalEquation();
      
      if(prevResult > 0) {
        this.changePlusMinusSignForPositiveNumber();
      } else if(prevResult < 0) {
        this.changePlusMinusSignForNegativeNumber();
      } else {
        this.clearAndUpdateCurrentNumberOrSign(e);
        this.clearOperation();
        this.clearEvalEquation();
        this.changePlusMinusSignForPositiveNumber();
      }  
    } else if(prevResult > 0) {
      this.changePlusMinusSignForPositiveNumber();
    } else if(prevResult < 0) {
      this.changePlusMinusSignForNegativeNumber();
    }
    else if(prevResult === 0) {
      return;
    } else {
      this.clearOperation();
      this.clearEvalEquation();
      this.changePlusMinusSignForPositiveNumber();
    }  
  }

  // EQUALS BUTTON
  handleClickEqualsButton = (e) => {
    const { operation, evalEquation } = this.state.data;
    this.clearError();
    if(operation.length === 0) {
      return;
    } else if(operation[operation.length -1] === '=') {
      return;
    } else if(operation[operation.length -1] === '+' || operation[operation.length -1] === 'x' || operation[operation.length -1] === '/') {
      this.handleChangeSign(e);
    } else if(operation[operation.length -1] === '.') {
      this.handleComaSignInLastIndex(e);
    } else {
      if(evalEquation.includes('-') || evalEquation.includes('+') || evalEquation[evalEquation.length -1] === 'x' || evalEquation[evalEquation.length -1] === '/') {
        this.handleCountCurrentEquationAfterClickSign(e);
        this.equalizeOperationAndEvalEquationArrays()
      }
      this.handleUpdateResultAndShowOperation(e);
    }  
  }

  render() {
    
    console.log(`operation: ${this.state.data.operation}`);
    console.log(`evalEquation: ${this.state.data.evalEquation}`);
    console.log(`prevResult: ${this.state.data.prevResult}`);
    console.log(`current number or sign: ${this.state.data.currentNumberOrSign}`);
    console.log(`result: ${this.state.data.result}`);
    
    return (
      <div className="App">
        <div className="calculator-wrapper">
          <h1 className="app-title">Calculator (React)</h1>
          <div className="output">
            <div className="operationPanel">{this.state.data.operation}</div>
            <div className="resultPanel">{this.state.data.result}</div>
            <div className="errorPanel">{this.state.data.error}</div>
          </div>
          <div className="input">
            <div className="row">
              <div className="btn btn-fn btn-persentage" onClick={this.handlePersentageButton}>%</div>
              <div className="btn btn-fn btn-reciprocal" onClick={this.handleReciprocalButton}>1/x</div>
              <div className="btn btn-fn btn-clear" onClick={this.handleAllClearButton}>AC</div>
              <div className="btn btn-fn btn-delete" onClick={this.handleBackspaceButton}><BsBackspace /></div>
            </div>
            <div className="row">
              <div className="btn btn-fn btn-pow-2" onClick={this.handleMathPow2Button}>x<sup>2</sup></div>
              <div className="btn btn-fn btn-pow-3" onClick={this.handleMathPow3Button}>x<sup>3</sup></div>
              <div className="btn btn-fn btn-sqrt" onClick={this.handleSqrtButton}><FaSquareRootAlt /></div>
              <div className="btn btn-fn btn-divide" onClick={this.handleClickDivideButton}><RiDivideFill /></div>
            </div>
            <div className="row">
              <div className="btn btn-number" onClick={this.handleClickNumberButton}>7</div>
              <div className="btn btn-number" onClick={this.handleClickNumberButton}>8</div>
              <div className="btn btn-number" onClick={this.handleClickNumberButton}>9</div>
              <div className="btn btn-fn btn-multiply" onClick={this.handleClickMultiplyButton}>x</div>
            </div>
            <div className="row">
              <div className="btn btn-number" onClick={this.handleClickNumberButton}>4</div>
              <div className="btn btn-number" onClick={this.handleClickNumberButton}>5</div>
              <div className="btn btn-number" onClick={this.handleClickNumberButton}>6</div>
              <div className="btn btn-fn btn-minus" onClick={this.handleClickMinusButton}>-</div>
            </div>
            <div className="row">
              <div className="btn btn-number" onClick={this.handleClickNumberButton}>1</div>
              <div className="btn btn-number" onClick={this.handleClickNumberButton}>2</div>
              <div className="btn btn-number" onClick={this.handleClickNumberButton}>3</div>
              <div className="btn btn-fn btn-plus" onClick={this.handleClickPlusButton}>+</div>
            </div>
            <div className="row">
              <div className="btn btn-plus-minus" onClick={this.handlePlusMinusButton}>+/-</div>
              <div className="btn btn-number" onClick={this.handleClickNumberButton}>0</div>
              <div className="btn btn-coma" onClick={this.handleComaButton}>.</div>
              <div className="btn btn-fn btn-equals" onClick={this.handleClickEqualsButton}>=</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;