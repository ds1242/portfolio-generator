const inquirer = require('inquirer');
const generateSite = require('./utils/generate-site.js');
const generatePage = require('./src/page-template.js');
const { writeFile, copyFile } = require('./utils/generate-site.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html',pageHTML, err => {
//     if(err) throw new Error(err);

//     console.log('Portfolio Complete! checkout index.html to see the output!');
// })
const mockData = {
    name: 'Lernatino',
    github: 'Lernatino',
    projects: []
}
const promptUser = () => {
    return inquirer.prompt([
        {
            type:'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your github name!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourselft for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])        
};

const promptProject = portfolioData => {
    if(!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
    =================
    add new project
    =================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectName => {
                if(projectName) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type:'input',
            name: 'description',
            message: 'Provide a description of your project (required)',
            validate: projectDescription => {
                if(projectDescription) {
                    return true;
                } else {
                    console.log('Please enter your project description!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)',
            validate: projectLink => {
                if(projectLink) {
                    return true;
                } else {
                    console.log('Please enter your project link!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};


promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });

        // const pageHTML = generatePage(mockData);

    //     fs.writeFile('./dist/index.html',pageHTML, err => {
    //         // if(err) throw new Error(err);
    //         if (err){
    //             console.log(err);
    //             return;
    //         }
    //         console.log("Page created! Check out index.html in this directory to see it!");

    //         fs.copyFile('./src/style.css', './dist/style.css', err => {
    //             if(err){
    //                 console.log(err)
    //                 return;
    //             }
    //             console.log('Style sheet copied successfully!');
    //         });
    //     });
    // });
    