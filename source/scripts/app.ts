/**
 * Ed's Calculator (https://github.com/EdRands/WebCalculator)
 * Copyright (c) 2019-2020 Ed Rands
 * Licensed under MIT (https://github.com/EdRands/WebCalculator/blob/master/LICENSE)
 */

"use strict";

import { RegExp } from "core-js";

/**
 * Creates a new Calculator.
 * @class
 */
class Calculator {
  /**
   * The HTML element used to display the current input.
   * */
  private displayElement: HTMLInputElement = document.getElementById(
    "display"
  ) as HTMLInputElement;

  /**
   * The in-progress input.
   * */
  private currentInput: string = "0";

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
    this.attachClickEventToNegativeToggleButton();
    this.attachClickEventToBackspaceButton();
    this.attachClickEventToClearEntryButton();

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
  private attachClickEventToNegativeToggleButton() {
    const button = this.getButtonElement("negative-toggle-button");
    button.addEventListener("click", () => {
      calculator.toggleNegative();
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
  public toggleNegative() {
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
   * Clears the current input.
   */
  public clearCurrentInput() {
    this.setCurrentInput("0");
  }
}

let calculator = new Calculator();
