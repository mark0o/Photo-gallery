class PhotoGallery {
    constructor() {
        this.photos = [];
        this.currentPhotoIndex = 0;
        this.init();
    }

    init() {
        this.loadPhotos();
        this.setupEventListeners();
    }

    loadPhotos() {
        const photoElements = document.querySelectorAll('.photo-item');
        this.photos = Array.from(photoElements).map(element => ({
            src: element.dataset.src,
            title: element.dataset.title,
            description: element.dataset.description,
            date: element.dataset.date,
            location: element.dataset.location
        }));
    }

    setupEventListeners() {
        const photoElements = document.querySelectorAll('.photo-item');
        photoElements.forEach((element, index) => {
            element.addEventListener('click', () => {
                this.openLightbox(index);
            });
        });

        document.querySelector('.lightbox-close').addEventListener('click', () => {
            this.closeLightbox();
        });

        document.getElementById('lightbox-prev').addEventListener('click', () => {
            this.navigate(-1);
        });

        document.getElementById('lightbox-next').addEventListener('click', () => {
            this.navigate(1);
        });

        document.getElementById('lightbox').addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') {
                this.closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (document.getElementById('lightbox').classList.contains('active')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.navigate(-1);
                if (e.key === 'ArrowRight') this.navigate(1);
            }
        });
    }

    openLightbox(index) {
        this.currentPhotoIndex = index;
        this.updateLightbox();
        document.getElementById('lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        document.getElementById('lightbox').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    navigate(direction) {
        const newIndex = this.currentPhotoIndex + direction;
        if (newIndex >= 0 && newIndex < this.photos.length) {
            this.currentPhotoIndex = newIndex;
            this.updateLightbox();
        }
    }

    updateLightbox() {
        const photo = this.photos[this.currentPhotoIndex];
        document.getElementById('lightbox-image').src = photo.src;
        document.getElementById('lightbox-title').textContent = photo.title || 'Untitled';
        document.getElementById('lightbox-description').textContent = photo.description || '';
        document.getElementById('lightbox-date').textContent = photo.date || '';
        document.getElementById('lightbox-location').textContent = photo.location || '';

        document.getElementById('lightbox-prev').disabled = this.currentPhotoIndex === 0;
        document.getElementById('lightbox-next').disabled = this.currentPhotoIndex === this.photos.length - 1;
    }
}

new PhotoGallery();