export default function Page({ params }) {
    return (
      <div>
        <h1>Account ID: {params.id}</h1>
        <p>This is the account details page.</p>
      </div>
    );
  }
  