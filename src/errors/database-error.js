class DatabaseError extends Error {
  constructor(cause) {
    super('Error de base de datos');
    this.name = 'DatabaseError';
    this.error = cause.message;
    this.status = 500;

    console.error(cause.stack);
  }

  errorDto() {
    return {
      status: this.status,
      message: this.message,
      error: this.error,
    };
  }
}

module.exports = DatabaseError;
