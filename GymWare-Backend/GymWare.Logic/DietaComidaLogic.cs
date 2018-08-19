using GymWare.DataAccess.DAL;
using GymWare.Entities;
using GymWare.Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymWare.Logic
{
    public class DietaComidaLogic
    {
        private DietaComidaRepository _dc = new DietaComidaRepository();
        private DietaRepository _di = new DietaRepository();
        public DietaComidaDTO GetAllDietasConComidas()
        {
            DietaComidaDTO dcDTO = new DietaComidaDTO();
            dcDTO.DietaComidas = _dc.GetAll();
            dcDTO.Dieta = dcDTO.DietaComidas.Count > 0 ? dcDTO.DietaComidas[0].Dieta : null;
            return dcDTO;
        }

        public DietaComida GetDietaConComidas(int id)
        {
            return _dc.GetOne(id);
        }

        public bool Update(int idDieta, DietaComidaDTO dietaComida)
        {
            Dieta dieta = _di.Update(idDieta, dietaComida.Dieta);
            return _dc.Update(dieta, dietaComida.DietaComidas);
        }

        public bool Insert(DietaComidaDTO dietaComida)
        {
            Dieta dieta = _di.Insert(dietaComida.Dieta);
            return _dc.Insert(dieta, dietaComida.DietaComidas);
        }

        public bool InsertDietaCliente(DietaCliente dietaCliente)
        {
            if (_di.InsertDietaCliente(dietaCliente) != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Delete(int idDieta)
        {
            return _dc.Delete(idDieta) == _di.Delete(idDieta);
        }
    }
}
