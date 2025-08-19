import { useNavigate } from 'react-router-dom';
import cookingIcon from '../assets/icons/cooking.png';
import guitarIcon from '../assets/icons/guitar.png';
import codingIcon from '../assets/icons/coding.png';
import fitnessIcon from '../assets/icons/fitness.png';
import paintingIcon from '../assets/icons/painting.png';
import languageIcon from '../assets/icons/language.png';
import photographyIcon from '../assets/icons/photography.png';
import customIcon from '../assets/icons/custom.png';

function Skills() {
  const navigate = useNavigate();

  const skills = [
    { name: 'Coding', image: codingIcon, learners: '12,547' },
    { name: 'Guitar', image: guitarIcon, learners: '8,392' },
    { name: 'Cooking', image: cookingIcon, learners: '10,183' },
    { name: 'Fitness', image: fitnessIcon, learners: '15,729' },
    { name: 'Painting', image: paintingIcon, learners: '7,845' },
    { name: 'Language', image: languageIcon, learners: '9,631' },
    { name: 'Photography', image: photographyIcon, learners: '6,274' },
    { name: 'Custom Skill', image: customIcon, learners: 'Create your own' },
  ];

  const handleClick = (skillName) => {
    if (skillName === 'Custom Skill') {
      navigate('/skill/custom'); // ✅ Corrected route for CustomSkill.jsx
    } else {
      navigate(`/skill/${skillName.toLowerCase()}`);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Find Your Skill</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Choose from popular skills or create your own custom growth journey
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              onClick={() => handleClick(skill.name)}
              className="skill-card bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-all hover:shadow-lg cursor-pointer border border-gray-100"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-[#7c3aed1a] rounded-full mb-4">
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">{skill.name}</h3>
              <div className="user-count text-sm text-gray-500 transition-all text-center">
                <span className="font-medium">{skill.learners}</span>{' '}
                {skill.name === 'Custom Skill' ? '' : 'learners'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>  
  );
}

export default Skills;
