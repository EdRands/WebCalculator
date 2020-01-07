/**
 * Ed's Calculator (https://github.com/EdRands/WebCalculator)
 * Copyright (c) 2019-2020 Ed Rands
 * Licensed under MIT (https://github.com/EdRands/WebCalculator/blob/master/LICENSE)
 */

"use strict";

import { Decimal } from "decimal.js";

enum CalculatorOperators {
  None = "",
  Add = "+",
  Subtract = "−",
  Multiply = "×",
  Divide = "÷",
  Equal = "=",
  ToggleSign = "±",
}

/**
 * Creates a new Calculator.
 * @class
 */
class Calculator {
  /**
   * The HTML element used to display the current input.
   * */
  private readonly displayElement: HTMLInputElement = document.getElementById(
    "display"
  ) as HTMLInputElement;

  /**
   * The in-progress input.
   * */
  private currentInput: string = "0";

  /**
   * The previous input.
   * */
  private previousInput: Decimal = null;

  /**
   * The math operation in queue.
   * */
  private LastOperator: CalculatorOperators;

  /**
   * Class constructor.
   * @constructor
   */
  constructor() {
    // Attach click events to buttons.
    for (let number = 0; number <= 9; number++) {
      this.attachClickEventToNumberButton(number);
    }
    this.attachClickEventToDecimalButton();
    this.attachClickEventToSignToggleButton();
    this.attachClickEventToBackspaceButton();
    this.attachClickEventToClearEntryButton();
    this.attachClickEventToClearAllButton();
    this.attachClickEventToEqualsButton();
    this.attachClickEventToAddButton();
    this.attachClickEventToSubtractButton();
    this.attachClickEventToMultiplyButton();
    this.attachClickEventToDivideButton();

    // Update the input display
    this.updateDisplay();
  }

  /**
   * Sets and updates the current input.
   *
   * @param {string} newInput The new input to replace the old input.
   * @returns {string} The revised input.
   */
  public setCurrentInput(newInput: string): string {
    this.currentInput = newInput;
    this.updateDisplay();
    return this.currentInput;
  }

  /**
   * Clears the current input.
   */
  public clearCurrentInput() {
    this.setCurrentInput("0");
  }

  /**
   * Clears all the inputs.
   */
  public clearAllInputs() {
    this.previousInput = null;
    this.setCurrentInput("0");
  }

  /**
   * Updates the display of the current input
   * @returns {string} The value of the display input element.
   */
  private updateDisplay(): string {
    this.displayElement.value = this.currentInput;
    return this.displayElement.value;
  }

  /**
   * Get a button by its ID.
   * @param ID {string}
   * @returns {HTMLButtonElement}
   */
  private getButtonElement(ID: string): HTMLButtonElement {
    return document.getElementById(ID) as HTMLButtonElement;
  }

  /**
   * Attach a click event to a number button.
   * @param {number} number The number the button represents.
   */
  private attachClickEventToNumberButton(number: number) {
    const buttonID = "number" + number + "-button";
    const appendage = number;
    const button = this.getButtonElement(buttonID);
    button.addEventListener("click", () => {
      calculator.appendDigitToInput(appendage);
    });
  }

  /**
   * Attach the click event to the Decimal(.) button.
   */
  private attachClickEventToDecimalButton() {
    const button = this.getButtonElement("decimal-button");
    button.addEventListener("click", () => {
      calculator.appendDecimalToInput();
    });
  }

  /**
   * Attach the click event to the Negative/Positive toggle button.
   */
  private attachClickEventToSignToggleButton() {
    const button = this.getButtonElement("toggle-sign-button");
    button.addEventListener("click", () => {
      calculator.toggleSign();
    });
  }

  /**
   * Attach the click event to the Backspace toggle button.
   */
  private attachClickEventToBackspaceButton() {
    const button = this.getButtonElement("backspace-button");
    button.addEventListener("click", () => {
      calculator.removeLastCharacterFromInput();
    });
  }

  /**
   * Attach the click event to the Clear Entry toggle button.
   */
  private attachClickEventToClearEntryButton() {
    const button = this.getButtonElement("clear-entry-button");
    button.addEventListener("click", () => {
      calculator.clearCurrentInput();
    });
  }

  /**
   * Attach the click event to the Clear Entry toggle button.
   */
  private attachClickEventToClearAllButton() {
    const button = this.getButtonElement("clear-all-button");
    button.addEventListener("click", () => {
      calculator.clearAllInputs();
    });
  }

  /**
   * Attach the click event to the Equals operation button.
   */
  private attachClickEventToEqualsButton() {
    const button = this.getButtonElement("equals-button");
    button.addEventListener("click", () => {
      calculator.equals();
    });
  }

  /**
   * Attach the click event to the Addition operation button.
   */
  private attachClickEventToAddButton() {
    const button = this.getButtonElement("add-button");
    button.addEventListener("click", () => {
      calculator.addition();
    });
  }

  /**
   * Attach the click event to the Subtraction operation button.
   */
  private attachClickEventToSubtractButton() {
    const button = this.getButtonElement("subtract-button");
    button.addEventListener("click", () => {
      calculator.subtraction();
    });
  }

  /**
   * Attach the click event to the Multiplication operation button.
   */
  private attachClickEventToMultiplyButton() {
    const button = this.getButtonElement("multiply-button");
    button.addEventListener("click", () => {
      calculator.multiply();
    });
  }

  /**
   * Attach the click event to the Division operation button.
   */
  private attachClickEventToDivideButton() {
    const button = this.getButtonElement("divide-button");
    button.addEventListener("click", () => {
      calculator.divide();
    });
  }

  /**
   * Checks if the input is not acceptable.
   * @param {string} input The input to verify.
   * @returns {boolean} Returns false if the input is valid, otherwise returns false.
   */
  private isNotValidInput(input: string): boolean {
    const testRegEx = /^[0-9.]$/m;
    if (testRegEx.test(input)) return false;
    else return true;
  }

  /**
   * Append a single digit to the current input.
   * @param {number} digit The digit to append.
   * @returns {void}
   */
  public appendDigitToInput(digit: number): void {
    if (this.isNotValidInput(digit.toString())) {
      return;
    } else if (this.currentInput == "0") {
      this.setCurrentInput(digit.toString());
    } else {
      this.setCurrentInput(this.currentInput + "" + digit);
    }
  }

  /**
   * Append a decimal point to the current input.
   */
  public appendDecimalToInput() {
    if (this.currentInput.indexOf(".") === -1) {
      this.setCurrentInput(this.currentInput + ".");
    }
  }

  /**
   * Toggle the negativity of the current input.
   */
  public toggleSign() {
    let input = parseFloat(this.currentInput);

    if (isNaN(input)) {
      return;
    } else if (input > 0) {
      input = -Math.abs(input);
      this.setCurrentInput(input.toString());
    } else if (input < 0) {
      input = Math.abs(input);
      this.setCurrentInput(input.toString());
    }
  }

  /**
   * Remove the most recent character from the current input.
   */
  public removeLastCharacterFromInput() {
    let newInput = this.currentInput.slice(0, -1);

    if (newInput == "") {
      this.setCurrentInput("0");
    } else {
      this.setCurrentInput(newInput);
    }
  }

  /**
   * Shift current input to previous input.
   */
  shiftInputs() {
    this.previousInput = new Decimal(this.currentInput);
    this.clearCurrentInput();
  }

  /**
   * Total two numbers together.
   */
  public equals() {
    // Do nothing if there is no other number
    if (this.previousInput === null) {
      return;
    }

    let result: Decimal;

    switch (this.LastOperator) {
      case CalculatorOperators.Add:
        result = this.previousInput.plus(this.currentInput);
        break;
      case CalculatorOperators.Subtract:
        result = this.previousInput.minus(this.currentInput);
        break;
      case CalculatorOperators.Multiply:
        result = this.previousInput.times(this.currentInput);
        break;
      case CalculatorOperators.Divide:
        result = this.previousInput.dividedBy(this.currentInput);
        break;
    }

    this.setCurrentInput(result.toString());
  }

  /**
   * Prepare to add numbers together.
   */
  public addition() {
    this.LastOperator = CalculatorOperators.Add;
    this.shiftInputs();
  }

  /**
   * Prepare to subtract numbers from each other.
   */
  public subtraction() {
    this.LastOperator = CalculatorOperators.Subtract;
    this.shiftInputs();
  }

  /**
   * Prepare to multiply numbers.
   */
  public multiply() {
    this.LastOperator = CalculatorOperators.Multiply;
    this.shiftInputs();
  }

  /**
   * Prepare to divide numbers.
   */
  public divide() {
    this.LastOperator = CalculatorOperators.Divide;
    this.shiftInputs();
  }
}

let calculator = new Calculator();
