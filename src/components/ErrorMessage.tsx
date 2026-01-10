const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="error-message">
        <h2>Erreur</h2>
        <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;