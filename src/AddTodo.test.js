import { render, screen, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

test('test that App component renders Task', () => {
	render(<App />);
	const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
	const inputDate = screen.getByPlaceholderText('mm/dd/yyyy');
	const element = screen.getByRole('button', { name: /Add/i });
	const dueDate = '05/30/2023';

	// Add task
	fireEvent.change(inputTask, { target: { value: 'History Test' } });
	fireEvent.change(inputDate, { target: { value: dueDate } });
	fireEvent.click(element);

	// Search for task
	const check = screen.getByText(/History Test/i);
	const checkDate = screen.getByTestId('new-item-date');

	// Ensure task is in our page
	expect(check).toBeInTheDocument();
	expect(checkDate).toBeInTheDocument();
});

test("test that App component doesn't render duplicate Task", () => {
	render(<App />);
	const inputTask = screen.getByRole('textbox', { name: /Add New Item/i });
	const inputDate = screen.getByPlaceholderText('mm/dd/yyyy');
	const addButton = screen.getByRole('button', { name: /Add/i });
	const dueDate = '05/30/2023';

	// Add the first task
	fireEvent.change(inputTask, { target: { value: 'History Test' } });
	fireEvent.change(inputDate, { target: { value: dueDate } });
	fireEvent.click(addButton);

	// Verify only one card is rendered
	const cards = screen.getAllByTestId('todo-collection');
	expect(cards.length).toBe(1);

	// Add the second task with the same name
	fireEvent.change(inputTask, { target: { value: 'History Test' } });
	fireEvent.change(inputDate, { target: { value: dueDate } });
	fireEvent.click(addButton);

	// Verify there is still only one task card
	const updatedCards = screen.getAllByTestId('todo-collection');
	expect(updatedCards.length).toBe(1);
});

test("test that App component doesn't add a task without task name", () => {
	render(<App />);
});

test("test that App component doesn't add a task without due date", () => {
	render(<App />);
});

test('test that App component can be deleted thru checkbox', () => {
	render(<App />);
});

test('test that App component renders different colors for past due events', () => {
	render(<App />);
});
