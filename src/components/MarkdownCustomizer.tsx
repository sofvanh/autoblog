import { useState } from "react";
import { useEffect } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { useUserContext } from "./UserContext";
import { fetchModifiedMarkdown } from "../utils/aiApiConnector";

export default function MarkdownCustomizer() {
  const [content, setContent] = useState('')
  const [modifiedContent, setModifiedContent] = useState('')
  const { prompt } = useUserContext();

  useEffect(() => {
    fetch('/src/content/hello.md')
      .then(res => res.text())
      .then(text => setContent(text))
  }, [])

  useEffect(() => {
    if (content && prompt) {
      fetchModifiedMarkdown(content, prompt).then(response => {
        setModifiedContent(response.text);
      });
    } else if (content) {
      setModifiedContent('');
    }
  }, [content, prompt])

  return (
    <div>
      <MarkdownRenderer markdown={modifiedContent || content} />
    </div>
  )
}