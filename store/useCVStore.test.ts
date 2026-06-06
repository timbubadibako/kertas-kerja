import { describe, it, expect, beforeEach } from 'vitest';
import { useCVStore } from './useCVStore';

describe('useCVStore', () => {
  beforeEach(() => {
    // Reset store state
    useCVStore.setState({
      activeSection: 'personal',
      versions: [],
      activeVersionId: null
    });
    
    // Create an initial version for testing data actions
    const { createVersion } = useCVStore.getState();
    createVersion('Test CV');
  });

  const getActiveData = () => {
    const state = useCVStore.getState();
    const active = state.versions.find(v => v.id === state.activeVersionId);
    return active?.data;
  };

  it('should update personal info', () => {
    const { updatePersonal } = useCVStore.getState();
    updatePersonal({ fullName: 'John Doe' });
    
    expect(getActiveData()?.personal.fullName).toBe('John Doe');
  });

  it('should update multiple personal info fields', () => {
    const { updatePersonal } = useCVStore.getState();
    updatePersonal({ fullName: 'John Doe', email: 'john@example.com' });
    
    expect(getActiveData()?.personal.fullName).toBe('John Doe');
    expect(getActiveData()?.personal.email).toBe('john@example.com');
  });

  it('should change active section', () => {
    const { setActiveSection } = useCVStore.getState();
    setActiveSection('work');
    
    expect(useCVStore.getState().activeSection).toBe('work');
  });

  it('should add work experience', () => {
    const { addWork } = useCVStore.getState();
    addWork();
    
    expect(getActiveData()?.work).toHaveLength(1);
    expect(getActiveData()?.work[0].company).toBe('');
  });

  it('should update work experience', () => {
    const { addWork, updateWork } = useCVStore.getState();
    addWork();
    updateWork(0, { company: 'Tech Corp', position: 'Developer' });
    
    expect(getActiveData()?.work[0].company).toBe('Tech Corp');
    expect(getActiveData()?.work[0].position).toBe('Developer');
  });

  it('should remove work experience', () => {
    const { addWork, removeWork } = useCVStore.getState();
    addWork();
    addWork();
    removeWork(0);
    
    expect(getActiveData()?.work).toHaveLength(1);
  });

  it('should add education', () => {
    const { addEducation } = useCVStore.getState();
    addEducation();
    
    expect(getActiveData()?.education).toHaveLength(1);
  });

  it('should update education', () => {
    const { addEducation, updateEducation } = useCVStore.getState();
    addEducation();
    updateEducation(0, { school: 'University X', degree: 'BSc' });
    
    expect(getActiveData()?.education[0].school).toBe('University X');
    expect(getActiveData()?.education[0].degree).toBe('BSc');
  });

  it('should remove education', () => {
    const { addEducation, removeEducation } = useCVStore.getState();
    addEducation();
    removeEducation(0);
    
    expect(getActiveData()?.education).toHaveLength(0);
  });

  it('should manage skills', () => {
    const { addSkill, updateSkill, removeSkill } = useCVStore.getState();
    addSkill();
    const skills = useCVStore.getState().getActiveVersion()?.data.skills || [];
    const skillId = skills[0].id;
    
    updateSkill(skillId, { name: 'React', level: 5 });
    expect(getActiveData()?.skills[0].name).toBe('React');
    expect(getActiveData()?.skills[0].level).toBe(5);

    removeSkill(skillId);
    expect(getActiveData()?.skills).toHaveLength(0);
  });

  it('should manage versions', () => {
    const { createVersion, deleteVersion, cloneVersion, loadVersion } = useCVStore.getState();
    
    // Test creation
    createVersion('Another CV');
    expect(useCVStore.getState().versions).toHaveLength(2);
    expect(useCVStore.getState().activeVersionId).toBe(useCVStore.getState().versions[1].id);
    
    // Test loading
    const firstId = useCVStore.getState().versions[0].id;
    loadVersion(firstId);
    expect(useCVStore.getState().activeVersionId).toBe(firstId);
    
    // Test cloning
    cloneVersion(firstId, 'Clone of First');
    expect(useCVStore.getState().versions).toHaveLength(3);
    expect(useCVStore.getState().versions[2].name).toBe('Clone of First');
    
    // Test deletion
    const cloneId = useCVStore.getState().versions[2].id;
    deleteVersion(cloneId);
    expect(useCVStore.getState().versions).toHaveLength(2);
  });
});
