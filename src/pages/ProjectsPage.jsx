import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import { projectApi } from "../lib/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [submitting, setSubmitting] = useState(false);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await projectApi.list();
      setProjects(response.projects || response.data || response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const createProject = async (event) => {
    event.preventDefault();
    if (!form.name.trim()) return setError("A project name is required.");
    if (form.name.trim().length > 100)
      return setError("A project name must be 100 characters or fewer.");

    try {
      setSubmitting(true);
      const response = await projectApi.create({
        ...form,
        name: form.name.trim(),
      });
      const project = response.project || response.data || response;
      setProjects((items) => [project, ...items]);
      setForm({ name: "", description: "" });
      setCreating(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project and its tasks?")) return;

    try {
      await projectApi.remove(id);
      setProjects((items) =>
        items.filter((item) => item._id !== id && item.id !== id),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your projects</h1>
          <p className="mt-1 text-slate-500">
            Create a project, then track its work in one place.
          </p>
        </div>
        <Button onClick={() => setCreating(true)}>+ New project</Button>
      </div>

      {error && (
        <div className="mb-5">
          <Alert>{error}</Alert>
        </div>
      )}

      {loading ? (
        <Loader label="Loading projects…" />
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <h2 className="text-lg font-semibold">No projects yet</h2>
          <p className="mt-1 text-sm text-slate-500">
            Create your first project to start organizing tasks.
          </p>
          <Button className="mt-5" onClick={() => setCreating(true)}>
            Create project
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const id = project._id || project.id;

            return (
              <article
                key={id}
                className="flex min-h-44 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="text-lg font-bold">{project.name}</h2>
                <p className="mt-2 flex-1 text-sm text-slate-500">
                  {project.description || "No description provided."}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <Link
                    to={`/projects/${id}/tasks`}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    View tasks →
                  </Link>
                  <button
                    onClick={() => deleteProject(id)}
                    className="text-sm font-medium text-slate-400 hover:text-rose-600"
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {creating && (
        <Modal title="Create project" onClose={() => setCreating(false)}>
          <form onSubmit={createProject} className="space-y-4">
            <Input
              label="Project name"
              autoFocus
              placeholder="Website redesign"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />

            <label className="block text-sm font-medium text-slate-700">
              Description
              <textarea
                rows="3"
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                placeholder="What is this project about?"
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
              />
            </label>

            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setCreating(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={submitting}>
                Create project
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </Layout>
  );
}