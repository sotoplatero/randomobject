
<article class="py-24 mx-auto">
    
    <form action="https://api.web3forms.com/submit" method="POST" class="w-full max-w-md mx-auto space-y-4">
        <h1 class="">Contact Me</h1>
        <p>Write me and we talk.</p>
    
        <input type="hidden" name="access_key" value="PUBLIC_WEB3FORMS_ACCESS_KEY">
        <input type="hidden" name="from_name" value="RandomObject">
        <input type="hidden" name="redirect" value="https://web3forms.com/success">
    
        <label class="form-control w-full">
            <span class="label-text">Name</span>
            <input type="text" name="name" class="input input-bordered " required>
        </label>

        <label class="form-control w-full">
            <span class="label-text">Email</span>
            <input type="email" name="email" class="input input-bordered " required>
        </label>

        <label class="form-control w-full">
            <span class="label-text">Message</span>
            <textarea name="message" class="textarea textarea-bordered " required></textarea>
        </label>
    
        <button type="submit" class="btn btn-primary">Contact Me</button>
    </form>

</article>