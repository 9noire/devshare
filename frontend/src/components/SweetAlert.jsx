import Swal from 'sweetalert2';

export const showSuccess = (title, text = '') => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: 'OK',
    confirmButtonColor: '#000000',
    background: '#ffffff',
    color: '#000000',
    iconColor: '#000000',
  });
};

export const showConfirm = (title, text = '') => {
  return Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#dc2626', 
    cancelButtonColor: '#6b7280',  
    background: '#ffffff',
    color: '#000000',
    iconColor: '#dc2626',
    reverseButtons: true, 
  });
};

export const showAlert = (title, text = '', icon = 'info') => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'OK',
    confirmButtonColor: '#000000',
    background: '#ffffff',
    color: '#000000',
  });
};