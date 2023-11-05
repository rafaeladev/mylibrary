import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import BookForm from '@/components/form/BookForm';

const page = () => {
    return (
        <MaxWidthWrapper>
            <div>
                <h1>New BOOK Test</h1>
                <BookForm />
            </div>
        </MaxWidthWrapper>
    );
};

export default page;
