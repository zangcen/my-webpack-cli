import '../../less/main.less';
import './index.less';

import A from '@/js/common';

class B {
    test () {
        alert('hello world');
    }
}

new B().test();
A.test();

if(process.env.NODE_ENV === 'development'){
    console.log('first');
}
