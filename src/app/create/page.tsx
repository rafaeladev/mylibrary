import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ComplexForm from '@/components/SimpleForm';

import BookForm from '@/components/form/BookForm';
import BookCover from '@/pages/bookcover/BookCover';

const page = () => {
    return (
        <MaxWidthWrapper>
            <div>
                <h1>Ajourter un nouveau Livre</h1>
                {/* <BookForm /> */}
                <ComplexForm />
            </div>
        </MaxWidthWrapper>
    );
};

export default page;
