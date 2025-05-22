  private getFileExtension(format: string): string {
    switch (format) {
      case 'pdf':
        return 'pdf';
      case 'xlsx':
        return 'xlsx';
      case 'csv':
        return 'csv';
      default:
        return 'txt';
    }
  }

  // Replace the incorrect ternary with the helper method
  const fileExt = this.getFileExtension(dto.format); 