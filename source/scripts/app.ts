/**
 * Ed's Calculator (https://github.com/EdRands/WebCalculator)
 * Copyright (c) 2019-2020 Ed Rands
 * Licensed under MIT (https://github.com/EdRands/WebCalculator/blob/master/LICENSE)
 */

'use strict'

import { Decimal } from 'decimal.js'

const enum calculatorFunctions {
  Add,
  Subtract,
  Multiply,
  Divide,
  Equals,
  ToggleSign,
  Backspace,
  ClearEntry,
  ClearAll,
}

/**
 * Creates a new Calculator.
 * @class
 */
class Calculator {
  /**
   * The HTML element used to display the current input.
   * */
  private readonly displayElement: HTMLInputElement = this.getDisplayElement()

  /**
   * The in-progress input.
   * */
  private currentInput = '0'

  /**
   * The previous input.
   * */
  private previousInput: Decimal = null

  /**
   * The math operation in queue.
   * */
  private lastOperator: calculatorFunctions = null

  private readonly operationButtons = {
    '#add-button': calculatorFunctions.Add,
    '#subtract-button': calculatorFunctions.Subtract,
    '#multiply-button': calculatorFunctions.Multiply,
    '#divide-button': calculatorFunctions.Divide,
    '#equals-button': calculatorFunctions.Equals,
    '#toggle-sign-button': calculatorFunctions.ToggleSign,
    '#backspace-button': calculatorFunctions.Backspace,
    '#clear-entry-button': calculatorFunctions.ClearEntry,
    '#clear-all-button': calculatorFunctions.ClearAll,
  }

  /**
   * Class constructor.
   * @constructor
   */

  constructor() {
    this.attachClickEvents()

    // Update the input display
    this.updateDisplay()
  }

  public attachClickEvents(): void {
    try {
      for (let number = 0; number <= 9; number++) {
        this.attachClickEventToInputButton(number, `#number${number}-button`)
      }
      this.attachClickEventToInputButton('.', '#decimal-button')

      for (const id in this.operationButtons) {
        const operation = this.operationButtons[id]
        this.attachClickEventToOperationButton(operation, id)
      }
    } catch (Error) {
      console.error(Error.message)
    }
  }

  /**
   * Sets and updates the current input.
   *
   * @param {string|number|Decimal} newInput The new input to replace the old input.
   */
  public setCurrentInput(newInput: string | number | Decimal): void {
    if (newInput === '') {
      newInput = '0'
    }

    if (typeof newInput !== 'string') {
      newInput = newInput.toString()
    }

    this.currentInput = newInput
    this.updateDisplay()
  }

  /**
   * Clears the current input.
   */
  private clearCurrentInput(): void {
    this.setCurrentInput('')
  }

  /**
   * Updates the display of the current input
   * @returns {string} The value of the display input element.
   */
  private updateDisplay(): string {
    this.displayElement.value = this.currentInput
    return this.displayElement.value
  }

  /**
   * Get an HTML element by its ID.
   * @param id {string} An element ID, with or without a leading #.
   * @throws {Error} Will throw an error if the element does not exist in the document.
   * @returns {HTMLElement}
   */
  private getElement(id: string): HTMLElement {
    if (id.charAt(0) === '#') id = id.substr(1)

    const element = document.getElementById(id)

    if (element === null) {
      throw new Error(`Unable to find element with an ID of '#${id}'.`)
    }

    return element
  }

  /**
   * Get an <input> element to use as a display.
   * @param id {string} The element ID of the <input> to use.
   * @throws {Error} Will throw an error if the element is not of the type <input>.
   * @returns {HTMLInputElement} The <input> object.
   */
  private getDisplayElement(id?: string): HTMLInputElement {
    if (!id) id = '#display'
    const display = this.getElement(id)

    if (display.nodeName !== 'INPUT') {
      throw new Error(`${id} is not an <input>.`)
    }

    return display as HTMLInputElement
  }

  /**
   * Attach a click event to an input button.
   * @param {number|string} input The number the button represents.
   * @param {string} The ID of the element to which we attach the click event.
   */
  private attachClickEventToInputButton(input: number | string, element: string): void {
    const button = this.getElement(element)

    button.onclick = () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      calculator.appendToInput(input)
    }
  }

  /**
   * Attach a click event to an operation button.
   * @param {calculatorFunctions} operation The operation the button represents.
   * @param {string} The ID of the element to which we attach the click event.
   */
  private attachClickEventToOperationButton(operation: calculatorFunctions, element: string): void {
    const button = this.getElement(element)

    button.onclick = () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      calculator.operation(operation)
    }
  }

  /**
   * Checks if the input is not acceptable.
   * @param {string} input The input to verify.
   * @returns {boolean} Returns false if the input is valid, otherwise returns false.
   */
  private isNotValidInput(input: string): boolean {
    const testRegEx = /^[0-9.]$/m
    if (testRegEx.test(input)) return false
    else return true
  }

  /**
   * Append to the current input.
   * @param {number | string} appendage The input to append.
   */
  public appendToInput(appendage: number | string): void {
    if (typeof appendage === 'number') appendage = appendage.toString()

    if (this.isNotValidInput(appendage)) {
      return
    }

    if (appendage === '.') {
      if (this.currentInput.indexOf(appendage) === -1) {
        this.setCurrentInput(this.currentInput + appendage)
      }
    } else if (this.currentInput === '0') {
      this.setCurrentInput(appendage)
    } else {
      this.setCurrentInput(this.currentInput + appendage)
    }
  }

  /**
   * Perform an operation.
   * @param {calculatorFunctions} operation The operation to perform.
   */
  public operation(operation: calculatorFunctions): void {
    switch (operation) {
      case calculatorFunctions.Add:
      case calculatorFunctions.Subtract:
      case calculatorFunctions.Multiply:
      case calculatorFunctions.Divide:
        this.lastOperator = operation
        this.shiftInputs()
        break
      case calculatorFunctions.Equals:
        this.equals()
        break
      case calculatorFunctions.ToggleSign:
        this.toggleSign()
        break
      case calculatorFunctions.Backspace:
        this.removeLastCharacterFromInput()
        break
      case calculatorFunctions.ClearAll:
        this.lastOperator = null
        this.previousInput = null
        this.clearCurrentInput()
        break
      case calculatorFunctions.ClearEntry:
        this.clearCurrentInput()
        break
    }
  }

  /**
   * Toggle the sign of the current input.
   */
  private toggleSign(): void {
    let input = parseFloat(this.currentInput)

    if (input > 0) {
      input = -Math.abs(input)
      this.setCurrentInput(input)
    } else if (input < 0) {
      input = Math.abs(input)
      this.setCurrentInput(input)
    }
  }

  /**
   * Remove the most recent character from the current input.
   */
  public removeLastCharacterFromInput(): void {
    const newInput = this.currentInput.slice(0, -1)

    if (newInput === '') {
      this.setCurrentInput('0')
    } else {
      this.setCurrentInput(newInput)
    }
  }

  /**
   * Shift current input to previous input.
   */
  private shiftInputs(): void {
    this.previousInput = new Decimal(this.currentInput)
    this.clearCurrentInput()
  }

  /**
   * Total two numbers together.
   */
  private equals(): void {
    // Do nothing if there is no other number
    if (this.previousInput === null) return

    let result: Decimal

    switch (this.lastOperator) {
      case calculatorFunctions.Add:
        result = this.previousInput.plus(this.currentInput)
        break
      case calculatorFunctions.Subtract:
        result = this.previousInput.minus(this.currentInput)
        break
      case calculatorFunctions.Multiply:
        result = this.previousInput.times(this.currentInput)
        break
      case calculatorFunctions.Divide:
        result = this.previousInput.dividedBy(this.currentInput)
        break
    }

    this.setCurrentInput(result)
  }
}

const calculator = new Calculator()
calculator.attachClickEvents()
