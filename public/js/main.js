document.addEventListener('DOMContentLoaded', () => {
    const sortFilter = document.getElementById('sortFilter');
    const todoItems = document.querySelectorAll('.todo-item');

    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            const filterValue = e.target.value;
            
            todoItems.forEach(item => {
                const isCompleted = item.classList.contains('completed');
                
                if (filterValue === 'all') {
                    item.style.display = 'flex';
                } else if (filterValue === 'completed') {
                    item.style.display = isCompleted ? 'flex' : 'none';
                } else if (filterValue === 'pending') {
                    item.style.display = isCompleted ? 'none' : 'flex';
                }
            });
        });
    }

    // Auto-hide toast after 3 seconds
    const toast = document.getElementById('toast');
    if (toast) {
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }
});

