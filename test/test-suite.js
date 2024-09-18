const colors = {
    success: '\x1b[32m%s\x1b[0m', // Green (32)
    error: '\x1b[31m%s\x1b[0m', // Red (31)
    title: '\x1b[34;1;4m%s\x1b[0m', // Bold (1) blue (34) underlined (4)
};

const options = {
    reportSucessfulTests: true,
    reportFailedTests: true,
};

export function testSuite(desc, ...suite_fns) {
    const it = function(desc, fn) {
        try {
            fn();
            return { successful: true, error: null, color: colors.success, message: `\u2714 ${desc}` };
        } catch (error) {
            return { successful: false, error: error, color: colors.error, message: `\u2718 ${desc}` };
        }
    };

    const results = suite_fns.map(fn => fn(it));
    const color = results.every(result => result.successful) ? colors.title : colors.error;
    console.log(color, `${desc} [${results.filter(result => result.successful).length}/${results.length}]`);
    results.forEach(result => {
        if (!result.successful && options.reportFailedTests) {
            console.log(result.color, ` ${result.message}`);
            console.error(result.error);
        } 
        else if (options.reportSucessfulTests) {
            console.log(result.color, ` ${result.message}`);
        }
    });
    console.log(); // New line
}
