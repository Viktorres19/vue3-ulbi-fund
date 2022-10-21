export default {
  mounted(el, binding) {
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      // if (entries[0].isIntersecting && this.page < this.totalPages) {
      if (entries[0].isIntersecting) {
        // call not obvious function but function which we pass to object binding as value field
        binding.value()
        // this.loadMorePosts()
      }
    };
    const observer = new IntersectionObserver(callback, options);
    // seeking for the current element. directive linked to it
    observer.observe(el);
  },
  name: 'intersection'
}