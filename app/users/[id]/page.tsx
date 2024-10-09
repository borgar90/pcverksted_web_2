import UserDetails from './UserDetails';

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    amountSpent: 1500,
    finnAccountName: 'johndoe123',
    finnProfileLink: 'https://www.finn.no/user/johndoe123',
    dateCreated: '2023-01-15',
    purchases: [
      { id: 1, item: 'Custom PC', price: 1200, date: '2023-02-01' },
      { id: 2, item: 'Software License', price: 300, date: '2023-03-15' },
    ],
  },
  // Add more mock users as needed
];

export async function generateStaticParams() {
  return mockUsers.map((user) => ({
    id: user.id.toString(),
  }));
}

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  const userId = parseInt(params.id);
  const user = mockUsers.find(u => u.id === userId);

  if (!user) {
    return <div>User not found</div>;
  }

  return <UserDetails user={user} />;
}