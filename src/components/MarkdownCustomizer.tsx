import { useState, useEffect } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useUserContext } from "./UserContext";
import { fetchModifiedMarkdown } from "../utils/aiApiConnector";
import ToggleButton from "./ToggleButton";

export default function MarkdownCustomizer() {
  const { userDescription } = useUserContext();
  const [content, setContent] = useState('');
  const [modifiedContent, setModifiedContent] = useState('');
  const [showModified, setShowModified] = useState(true);
  const { prompt } = useUserContext();

  useEffect(() => {
    fetch('/src/content/hello.md')
      .then(res => res.text())
      .then(text => setContent(text));
  }, []);

  useEffect(() => {
    if (content && prompt) {
      fetchModifiedMarkdown(content, prompt).then(response => {
        setModifiedContent(response.text);
        setShowModified(true);
      });
    } else if (content) {
      setModifiedContent('');
    }
  }, [content, prompt]);

  const toggleContent = () => {
    if (!userDescription) {
      // TODO: Show a modal to ask the user to personalize the site first
      return;
    }
    setShowModified(prev => !prev);
  };

  return (
    <div>
      <MarkdownRenderer markdown={showModified ? (modifiedContent || content) : content} />
      <ToggleButton showModified={!!userDescription && showModified} toggleContent={toggleContent} optionOne="Original" optionTwo="Modified" />
    </div>
  );
}