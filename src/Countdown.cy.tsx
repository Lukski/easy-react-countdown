import React from 'react'
import Countdown from './Countdown'

describe('<Countdown />', () => {
  it('renders', () => {
    cy.mount(<Countdown/>)
  })

  it('renders when a targetdate is provided', () => {
    cy.mount(<Countdown targetDate={new Date(Date.now() + 5300)}/>)
  })

  it('executes callback', () => {
    const onCallbackSpy = cy.spy().as('onCallbackSpy')
    cy.mount(<Countdown targetDate={new Date(Date.now() + 3300)} callbackOnEnd={onCallbackSpy} audioStart={0}/>)
    cy.get('@onCallbackSpy').should('be.called');
  })

  it('counts down', () => {
    cy.mount(<Countdown targetDate={new Date(Date.now() + 5300)} audioStart={0}/>)
    cy.get('.simple-react-countdown').should('have.text', '5');
    cy.get('.simple-react-countdown').should('have.text', '4');
    cy.get('.simple-react-countdown').should('have.text', '3');
    cy.get('.simple-react-countdown').should('have.text', '2');
    cy.get('.simple-react-countdown').should('have.text', '1');
    cy.get('.simple-react-countdown').should('have.text', '0');
  })

  it('works correctly when time changes in between (simulating suspension)', () => {
    cy.mount(<Countdown targetDate={new Date(Date.now() + 60300)} audioStart={0}/>)
    cy.get('.simple-react-countdown').should('have.text', '60');
    cy.get('.simple-react-countdown').should('have.text', '59');
    cy.clock(new Date(Date.now() + 58000));
    cy.get('.simple-react-countdown').should('have.text', '2');
    cy.tick(1000);
    cy.get('.simple-react-countdown').should('have.text', '1');
    cy.tick(1000);
    cy.get('.simple-react-countdown').should('have.text', '0');
  })
})