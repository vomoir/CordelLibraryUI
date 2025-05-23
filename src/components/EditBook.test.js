import { render, screen, fireEvent } from '@testing-library/react';
import EditBook from './EditBook';

const mockBookData = {
  Title: 'Interodeo',
  Author: 'Ayers Glass',
  Publisher: 'Strezzo',
  PublishedDate: '1949-06-08T00:00:00',
  NumberOfPages: 465,
  Blurb:
    'Eu magna esse nulla quis velit anim deserunt est minim exercitation...',
};

test('renders edit form with correct book details', () => {
  render(
    <EditBook
      bookData={mockBookData}
      isVisible={true}
      onClose={() => {}}
      onSave={() => {}}
    />
  );

  expect(screen.getByLabelText('Title:')).toHaveValue('Interodeo');
  expect(screen.getByLabelText('Author:')).toHaveValue('Ayers Glass');
  expect(screen.getByLabelText('Publisher:')).toHaveValue('Strezzo');
});

test('allows user to edit book title', () => {
  render(
    <EditBook
      bookData={mockBookData}
      isVisible={true}
      onClose={() => {}}
      onSave={() => {}}
    />
  );

  const titleInput = screen.getByLabelText('Title:');
  fireEvent.change(titleInput, { target: { value: 'New Title' } });

  expect(titleInput).toHaveValue('New Title');
});

test('calls onSave with updated data when form is submitted', () => {
  const mockSave = jest.fn();
  render(
    <EditBook
      bookData={mockBookData}
      isVisible={true}
      onClose={() => {}}
      onSave={mockSave}
    />
  );

  fireEvent.change(screen.getByLabelText('Title:'), {
    target: { value: 'Updated Title' },
  });
  fireEvent.submit(screen.getByRole('button', { name: /Save/i }));

  expect(mockSave).toHaveBeenCalledWith(
    expect.objectContaining({ Title: 'Updated Title' })
  );
});

test('closes modal when clicking cancel', () => {
  const mockClose = jest.fn();
  render(
    <EditBook
      bookData={mockBookData}
      isVisible={true}
      onClose={mockClose}
      onSave={() => {}}
    />
  );

  fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

  expect(mockClose).toHaveBeenCalled();
});
